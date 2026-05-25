import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../Config/ApiConfig';
import { useAuth } from '../Global/AuthContext';
import { useProducts } from '../Global/ProductsContext';

const shoppingRoutes = [
    '/',
    '/home',
    '/tshirts',
    '/jeans',
    '/shoes',
    '/watches',
    '/kurtis',
    '/sandals',
    '/sarees',
    '/accessories',
];

const getLocalSuggestion = ({ query, routeName, products }) => {
    const lowerQuery = query.toLowerCase();
    const jeans = products.filter((product) => product.name.toLowerCase().includes('jeans')).slice(0, 3);
    const tops = products.filter((product) => {
        const name = product.name.toLowerCase();
        return name.includes('t-shirt') || name.includes('kurti') || name.includes('top');
    }).slice(0, 3);
    const shoes = products.find((product) => product.name.toLowerCase().includes('shoes'));
    const watch = products.find((product) => product.name.toLowerCase().includes('watch'));
    const sandals = products.find((product) => product.name.toLowerCase().includes('sandal'));
    const accessory = products.find((product) => {
        const name = product.name.toLowerCase();
        return name.includes('sunglasses') || name.includes('bag') || name.includes('watch');
    });

    if (lowerQuery.includes('jeans') || routeName.includes('jeans')) {
        return [
            `Best match: ${jeans[0]?.name || 'Classic Blue Jeans'} with ${tops[0]?.name || 'Cotton T-shirt'}.`,
            `For casual wear, choose ${tops.map((product) => product.name).join(', ') || 'a plain white or black T-shirt'} with ${shoes?.name || 'clean sneakers'}.`,
            `For a smarter look, tuck in the top and add ${watch?.name || 'a simple watch'}.`,
        ].join('\n');
    }

    if (lowerQuery.includes('t-shirt') || lowerQuery.includes('shirt') || routeName.includes('tshirts')) {
        const jeansNames = jeans.map((product) => product.name).join(', ') || 'Slim Fit Jeans';
        return `For T-shirts, ${jeansNames} will match well. Choose blue jeans for a clean daily look, black jeans for a sharper outfit, and sneakers to keep it balanced.`;
    }

    if (lowerQuery.includes('college') || lowerQuery.includes('casual')) {
        return `For a casual outfit, try ${tops[0]?.name || 'Cotton T-shirt'}, ${jeans[0]?.name || 'Slim Fit Jeans'}, ${shoes?.name || 'Running Shoes'}, and ${watch?.name || 'Smart Watch'}.`;
    }

    if (lowerQuery.includes('party')) {
        return `For a party outfit, pick ${jeans[0]?.name || 'Slim Fit Jeans'} with ${tops[1]?.name || tops[0]?.name || 'Graphic T-shirt'} and add ${watch?.name || 'Smart Watch'}.`;
    }

    if (lowerQuery.includes('kurti') || routeName.includes('kurtis')) {
        return `For kurtis, pair light colors with ${sandals?.name || 'tan sandals'} and ${accessory?.name || 'simple accessories'}. For festive style, choose richer colors and one statement accessory.`;
    }

    if (lowerQuery.includes('saree') || routeName.includes('sarees')) {
        return 'For sarees, match the blouse with one color from the saree border. Add sandals or heels and keep accessories simple if the saree already has heavy detail.';
    }

    return `I can help match your search with a full outfit. Try asking "Which top goes with blue jeans?" or "What should I wear with ${query || routeName || 'this product'}?"`;
};

export const FloatingStyleBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'Need styling help? Ask me what goes well together.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { isAuthenticated } = useAuth();
    const { products } = useProducts();
    const query = searchParams.get('q') || '';
    const isShoppingRoute = shoppingRoutes.includes(location.pathname);

    const routeName = useMemo(
        () => location.pathname.replace('/', '').replace('-', ' ') || 'home',
        [location.pathname]
    );

    if (!isAuthenticated || !isShoppingRoute) {
        return null;
    }

    const askSuggestion = async (prompt) => {
        const question = prompt.trim();

        if (!question) {
            return;
        }

        setMessages((current) => [...current, { role: 'user', text: question }]);
        setInput('');
        setIsLoading(true);

        try {
            const context = query
                ? `The customer searched for "${query}" while browsing ${routeName}. `
                : `The customer is browsing ${routeName}. `;
            const { reply } = await apiRequest('/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: `${context}${question} Give a short outfit suggestion using products from the store when possible.`,
                }),
            });

            setMessages((current) => [...current, { role: 'assistant', text: reply }]);
        } catch {
            setMessages((current) => [
                ...current,
                {
                    role: 'assistant',
                    text: getLocalSuggestion({ query: `${query} ${question}`, routeName, products }),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        askSuggestion(input);
    };

    const quickQuestion = query
        ? `What goes well with ${query}?`
        : routeName === 'home'
            ? 'Which jeans and top should I buy together?'
            : `What goes well from ${routeName}?`;

    return (
        <aside className={`floating-stylebot ${isOpen ? 'floating-stylebot--open' : ''}`} aria-label="Shopping assistant">
            {isOpen && (
                <section className="floating-stylebot-panel">
                    <header className="floating-stylebot-header">
                        <div>
                            <strong>StyleBot</strong>
                            <span>Outfit suggestions</span>
                        </div>
                        <button type="button" onClick={() => setIsOpen(false)} aria-label="Close shopping assistant">
                            x
                        </button>
                    </header>

                    <div className="floating-stylebot-messages">
                        {messages.map((message, index) => (
                            <p className={`stylebot-message stylebot-message--${message.role}`} key={`${message.role}-${index}`}>
                                {message.text}
                            </p>
                        ))}
                        {isLoading && <p className="stylebot-message stylebot-message--assistant">Thinking...</p>}
                    </div>

                    <button
                        className="stylebot-quick"
                        type="button"
                        onClick={() => askSuggestion(quickQuestion)}
                        disabled={isLoading}
                    >
                        {quickQuestion}
                    </button>

                    <form className="stylebot-form" onSubmit={handleSubmit}>
                        <input
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask what matches..."
                            aria-label="Ask StyleBot"
                        />
                        <button type="submit" disabled={isLoading || !input.trim()}>
                            Send
                        </button>
                    </form>
                </section>
            )}

            <button
                className="floating-stylebot-button"
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? 'Close shopping assistant' : 'Open shopping assistant'}
            >
                <svg
                    className="stylebot-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <rect x="3" y="7" width="18" height="11" rx="2" ry="2" />
                    <path d="M8 3v4" />
                    <path d="M16 3v4" />
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <path d="M12 16v.01" />
                </svg>
            </button>
        </aside>
    );
};
