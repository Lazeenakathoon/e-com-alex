import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { useProducts } from '../Global/ProductsContext';
import { Navbar } from './Navbar';
import './Jeans.css';

export const Jeans = () => {
    const { products } = useProducts();
    const { addToCart: saveToCart } = useCart();

    const jeansProducts = products.filter((product) => /(jeans?|denim)/i.test(product.name));

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
                        <h1>Jeans</h1>
                        <p>Comfortable and stylish jeans for every style.</p>
                        <p className="subtext">Showing {jeansProducts.length} denim picks in your collection.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="products-container jeans-products" aria-label="Jeans">
                    {jeansProducts.map((product) => (
                        <article className="product-card jeans-card" key={product.id}>
                            <img
                                className="product-img"
                                src={product.image}
                                alt={product.name}
                                onError={(event) => {
                                    const fallback = 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80';
                                    if (event.currentTarget.src !== fallback) {
                                        event.currentTarget.src = fallback;
                                    }
                                }}
                            />
                            <div className="product-card-body">
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">Rs {product.price.toLocaleString('en-IN')}.00</div>
                            </div>
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