import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Global/AuthContext';
import { useProducts } from '../Global/ProductsContext';
import { Navbar } from './Navbar';

export const AdminPanel = () => {
    const { user } = useAuth();
    const { products, deleteProduct } = useProducts();
    const customProducts = products.filter((product) => String(product.id).startsWith('custom-') || Boolean(product.createdBy));

    const handleRemove = async (product) => {
        const result = await deleteProduct(product.id);

        if (result.success) {
            toast.success('Product removed from the admin catalog.');
            return;
        }

        toast.error(result.error || 'Unable to remove the product.');
    };

    return (
        <>
            <Navbar />
            <main className="admin-panel">
                <section className="admin-hero">
                    <div>
                        <p className="cart-eyebrow">Seller admin dashboard</p>
                        <h1>Store management</h1>
                        <p>Review product inventory, manage custom items, and keep your catalog up to date.</p>
                    </div>
                    <Link className="gender-cta" to="/addproducts">Add new product</Link>
                </section>

                <section className="admin-summary" aria-label="Admin summary">
                <div>
                    <span>Seller name</span>
                    <strong>{user?.displayName || 'Seller'}</strong>
                </div>
                <div>
                    <span>Seller ID</span>
                    <strong>{user?.uid || 'Unknown'}</strong>
                </div>
                <div>
                    <span>Total products</span>
                    <strong>{products.length}</strong>
                </div>
                <div>
                    <span>Custom products</span>
                    <strong>{customProducts.length}</strong>
                </div>
                </section>

                <section className="admin-grid" aria-label="Managed products">
                    {products.map((product) => {
                        const canDelete = String(product.id).startsWith('custom-') || Boolean(product.createdBy);

                        return (
                            <article className="admin-card" key={product.id}>
                                <img className="admin-img" src={product.image} alt={product.name} />
                                <div className="admin-content">
                                    <h2>{product.name}</h2>
                                    <p className="product-price">Rs {product.price.toLocaleString('en-IN')}.00</p>
                                    <p className="admin-meta">
                                        {product.createdBy ? `Created by ${product.createdBy}` : 'Catalog item'}
                                    </p>
                                </div>
                                <div className="admin-actions">
                                    {canDelete ? (
                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() => handleRemove(product)}
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <span className="readonly-label">Protected</span>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </section>
            </main>
        </>
    );
};
