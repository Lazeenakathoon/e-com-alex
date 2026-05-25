import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';
import { sandalsProducts as sandals } from '../data/CategoryProducts';

const fallbackSandalImage = 'https://images.unsplash.com/photo-1702840854890-80a71cc25e14?auto=format&fit=crop&w=700&q=80';

export const Sandals = () => {
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
            <main className="shop-page sandals-page">
                <section className="shop-hero sandals-hero">
                    <div>
                        <p className="cart-eyebrow">Women's Collection</p>
                        <h1>Girls Footwear</h1>
                        <p>Pretty sandals, party heels, and everyday straps ready for your cart.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="sandals-grid" aria-label="Girls footwear options">
                    {sandals.map((sandal) => (
                        <article className="sandal-card" key={sandal.id}>
                            <img
                                className="sandal-img"
                                src={sandal.image}
                                alt={sandal.name}
                                onError={(event) => {
                                    event.currentTarget.src = fallbackSandalImage;
                                }}
                            />
                            <div className="sandal-card-body">
                                <span>Girls Footwear</span>
                                <h2>{sandal.name}</h2>
                                <p>Size: {sandal.size}</p>
                                <strong>Rs {sandal.price.toLocaleString('en-IN')}.00</strong>
                                <button type="button" onClick={() => addToCart(sandal)}>
                                    Add To Cart
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
};
