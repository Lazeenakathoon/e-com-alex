import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { useProducts } from '../Global/ProductsContext';
import { Navbar } from './Navbar';

export const TShirts = () => {
    const { products } = useProducts();
    const { addToCart: saveToCart } = useCart();

    const isTShirt = (name) => {
        const normalized = name.toLowerCase();
        return normalized.includes('t-shirt')
            || normalized.includes('tshirt')
            || normalized.includes('t shirt')
            || normalized.includes('tee')
            || normalized.includes('shirt');
    };

    const tshirtProducts = products.filter((product) => isTShirt(product.name));

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
                <section className="shop-hero">
                    <div>
                        <p className="cart-eyebrow">Men's Collection</p>
                        <h1>T-Shirts</h1>
                        <p>Comfortable and stylish T-shirts for every occasion.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="products-container" aria-label="T-Shirts">
                    {tshirtProducts.length > 0 ? (
                        tshirtProducts.map((product) => (
                            <article className="product-card" key={product.id}>
                                <img
                                    className="product-img"
                                    src={product.image}
                                    alt={product.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                                />
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">Rs {product.price.toLocaleString('en-IN')}.00</div>
                                <button
                                    className="addcart-btn"
                                    type="button"
                                    onClick={() => addToCart(product)}
                                >
                                    ADD TO CART
                                </button>
                            </article>
                        ))
                    ) : (
                        <p className="empty-products">No T-shirts available right now. Please check back later or search for a different category.</p>
                    )}
                </section>
            </main>
        </>
    );
};