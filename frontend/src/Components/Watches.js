import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';

const watchProducts = [
    {
        id: 'watch-1',
        name: 'Titan Edge Classic',
        brand: 'Titan',
        price: 4499,
        description: 'A slim Titan dress watch with a clean dial, stainless steel case, and polished everyday style.',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-2',
        name: 'Fastrack Street Analog',
        brand: 'Fastrack',
        price: 2199,
        description: 'A bold Fastrack analog watch made for casual outfits, college days, and relaxed weekend looks.',
        image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-3',
        name: 'Casio Digital Sport',
        brand: 'Casio',
        price: 2999,
        description: 'A tough Casio digital watch with sport-ready utility, easy time reading, and durable comfort.',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-4',
        name: 'Fossil Grant Chronograph',
        brand: 'Fossil',
        price: 7999,
        description: 'A Fossil chronograph with a rich leather strap, layered dial, and premium vintage character.',
        image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-5',
        name: 'Timex Expedition Field',
        brand: 'Timex',
        price: 3499,
        description: 'A rugged Timex field watch with clear numerals and a dependable strap for everyday adventure.',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-6',
        name: 'Armani Exchange Mesh',
        brand: 'Armani Exchange',
        price: 8999,
        description: 'A refined Armani Exchange watch with a mesh bracelet and sleek dial for sharper evening looks.',
        image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-7',
        name: 'Sonata Office Wear',
        brand: 'Sonata',
        price: 1499,
        description: 'A practical Sonata watch with a comfortable strap and neat styling for daily office wear.',
        image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-8',
        name: 'Noise ColorFit Smart',
        brand: 'Noise',
        price: 2499,
        description: 'A modern Noise smartwatch with fitness tracking, bright display, and smart everyday convenience.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-9',
        name: 'Boat Wave Active',
        brand: 'boAt',
        price: 1999,
        description: 'A sporty boAt smartwatch with activity modes, lightweight comfort, and a clean touchscreen face.',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-10',
        name: 'Seiko Automatic Dress',
        brand: 'Seiko',
        price: 12999,
        description: 'A Seiko automatic watch with classic dress styling, reliable movement, and refined wrist presence.',
        image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-11',
        name: 'Daniel Wellington Petite',
        brand: 'Daniel Wellington',
        price: 9499,
        description: 'A minimalist Daniel Wellington watch with a slim profile and elegant styling for clean outfits.',
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'watch-12',
        name: 'G-Shock Tough Resin',
        brand: 'G-Shock',
        price: 6999,
        description: 'A bold G-Shock watch with shock-resistant build, sporty attitude, and dependable daily durability.',
        image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=700&q=80',
    },
];

export const Watches = () => {
    const { addToCart: saveToCart } = useCart();

    const addToCart = (product) => {
        const result = saveToCart(product);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <>
            <Navbar />
            <main className="shop-page">
                <section className="shop-hero watches-hero">
                    <div>
                        <p className="cart-eyebrow">Men's Collection</p>
                        <h1>Watches</h1>
                        <p>Analog classics, smart watches, sport styles, and premium brands for your shopping bag.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="products-container watches-products" aria-label="Watches">
                    {watchProducts.map((product) => (
                        <article className="product-card" key={product.id}>
                            <img className="product-img" src={product.image} alt={product.name} />
                            <div className="product-name">{product.name}</div>
                            <div className="product-brand">{product.brand}</div>
                            <p className="product-description">{product.description}</p>
                            <div className="product-price">Rs {product.price.toLocaleString('en-IN')}.00</div>
                            <button
                                className="addcart-btn"
                                type="button"
                                onClick={() => addToCart(product)}
                            >
                                ADD TO CART
                            </button>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
};
