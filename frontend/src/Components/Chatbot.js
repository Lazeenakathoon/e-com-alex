import { useState } from 'react';
import { apiRequest } from '../Config/ApiConfig';

export const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi! I’m StyleBot. Ask me for outfit ideas, product recommendations, or help finding something great.' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async (event) => {
        event.preventDefault();
        const trimmed = input.trim();

        if (!trimmed) {
            return;
        }

        const nextMessages = [...messages, { role: 'user', text: trimmed }];
        setMessages(nextMessages);
        setInput('');
        setLoading(true);

        try {
            const { reply } = await apiRequest('/chat', {
                method: 'POST',
                body: JSON.stringify({ message: trimmed }),
            });

            setMessages((current) => [...current, { role: 'assistant', text: reply }]);
        } catch (error) {
            setMessages((current) => [
                ...current,
                {
                    role: 'assistant',
                    text: error.message || 'I could not reach the assistant. Please try again.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const addQuickPrompt = (prompt) => {
        setInput(prompt);
    };

    return (
        <main className="assistant-page" style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            <section className="assistant-box" style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 18px 40px rgba(0,0,0,0.08)', padding: '1.5rem' }}>
                <header style={{ marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>StyleBot</h1>
                    <p style={{ margin: '0.5rem 0 0', color: '#555' }}>
                        Get personal shopping suggestions. Ask for outfit combinations, gift ideas, or product matches.
                    </p>
                </header>

                <div className="chat-window" style={{ minHeight: '360px', borderRadius: '16px', background: '#f7f7fb', padding: '1rem', overflowY: 'auto' }}>
                    {messages.map((message, index) => (
                        <div
                            key={`${message.role}-${index}`}
                            style={{
                                display: 'flex',
                                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '1rem',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '78%',
                                    background: message.role === 'user' ? '#008cdd' : '#ffffff',
                                    color: message.role === 'user' ? '#fff' : '#111',
                                    padding: '1rem',
                                    borderRadius: '18px',
                                    boxShadow: '0 10px 18px rgba(0,0,0,0.08)',
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendMessage} style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
                    <textarea
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Ask StyleBot for outfit ideas, brands, or product matches..."
                        rows={3}
                        style={{ width: '100%', borderRadius: '14px', border: '1px solid #d7d7df', padding: '0.95rem', resize: 'vertical' }}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        style={{
                            width: 'fit-content',
                            background: '#ff3d00',
                            color: '#fff',
                            border: 'none',
                            padding: '0.95rem 1.3rem',
                            borderRadius: '14px',
                            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? 'Thinking...' : 'Ask StyleBot'}
                    </button>
                </form>

                <section style={{ marginTop: '1.5rem' }}>
                    <h2 style={{ margin: '0 0 0.75rem', fontSize: '1rem', color: '#333' }}>Quick prompts</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <button type="button" onClick={() => addQuickPrompt('Show me a casual outfit for college.')}
                            style={{ borderRadius: '14px', border: '1px solid #ddd', padding: '0.75rem 1rem', background: '#fff', cursor: 'pointer' }}>
                            Casual outfit
                        </button>
                        <button type="button" onClick={() => addQuickPrompt('Which top goes well with blue jeans?')}
                            style={{ borderRadius: '14px', border: '1px solid #ddd', padding: '0.75rem 1rem', background: '#fff', cursor: 'pointer' }}>
                            Jeans match
                        </button>
                        <button type="button" onClick={() => addQuickPrompt('What should I buy for a summer party?')}
                            style={{ borderRadius: '14px', border: '1px solid #ddd', padding: '0.75rem 1rem', background: '#fff', cursor: 'pointer' }}>
                            Summer party
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
};
