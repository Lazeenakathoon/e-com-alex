import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';
import { shoesProducts } from '../data/CategoryProducts';

export const Shoes = () => {
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
                <section className="shop-hero shoes-hero">
                    <div>
                        <p className="cart-eyebrow">Men's Collection</p>
                        <h1>Shoes & Footwear</h1>
                        <p>Fresh sneakers, loafers, boots, sandals, and training shoes ready for your cart.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="products-container shoes-products" aria-label="Shoes and footwear">
                    {shoesProducts.map((product) => (
                        <article className="product-card" key={product.id}>
                            <img className="product-img" src={product.image} alt={product.name} />
                            <div className="product-name">{product.name}</div>
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
