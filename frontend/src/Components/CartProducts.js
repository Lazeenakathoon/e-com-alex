import { Link } from 'react-router-dom';
import { useCart } from '../Global/CartContext';

export const CartProducts = () => {
    const {
        cartProducts,
        cartTotals,
        increaseQuantity,
        decreaseQuantity,
        removeProduct
    } = useCart();

    return (
        <main className="cart-page">
            <section className="cart-shell">
                <div className="cart-header">
                    <div>
                        <p className="cart-eyebrow">Shopping cart</p>
                        <h1>Cart Products</h1>
                    </div>
                    <Link className="cart-back-link" to="/">
                        Continue shopping
                    </Link>
                </div>

                {cartProducts.length === 0 ? (
                    <div className="cart-empty">
                        <h2>Your cart is empty</h2>
                        <p>Add products to your cart and they will appear here.</p>
                        <Link to="/">Go back</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-list">
                            {cartProducts.map((product) => (
                                <article className="cart-product" key={product.id}>
                                    <img className="cart-img" src={product.image} alt={product.name} />
                                    <div className="cart-product-info">
                                        <h2 className="cart-name">{product.name}</h2>
                                        <p className="cart-price-orignal">
                                            Rs {product.price.toLocaleString('en-IN')}.00
                                        </p>
                                        {product.size && (
                                            <span className="cart-product-size">Size: {product.size}</span>
                                        )}
                                    </div>
                                    <div className="cart-quantity">
                                        <button
                                            className="dec"
                                            type="button"
                                            aria-label={`Decrease ${product.name} quantity`}
                                            onClick={() => decreaseQuantity(product.id)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity quantit">{product.quantity}</span>
                                        <button
                                            className="inc"
                                            type="button"
                                            aria-label={`Increase ${product.name} quantity`}
                                            onClick={() => increaseQuantity(product.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <strong>
                                        Rs {(product.price * product.quantity).toLocaleString('en-IN')}.00
                                    </strong>
                                    <button
                                        className="cart-remove delete-btn"
                                        type="button"
                                        onClick={() => removeProduct(product.id)}
                                    >
                                        Remove
                                    </button>
                                </article>
                            ))}
                        </div>

                        <aside className="cart-summary-box">
                            <h2>Order Summary</h2>
                            <div className="cart-summary-quantity">
                                <span>Total products</span>
                                <strong>{cartTotals.quantity}</strong>
                            </div>
                            <div className="cart-summary-price">
                                <span>Total price</span>
                                <strong>Rs {cartTotals.price.toLocaleString('en-IN')}.00</strong>
                            </div>
                            <Link to="/cashout">
                                <button type="button">Cash on Delivery</button>
                            </Link>
                        </aside>
                    </div>
                )}
            </section>
        </main>
    );
};
