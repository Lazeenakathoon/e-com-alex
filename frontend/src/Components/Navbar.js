import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../Global/AuthContext';
import { useCart } from '../Global/CartContext';
import logo from '../images/stylehub.png';

export const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { logout, user } = useAuth();
    const { cartTotals } = useCart();
    const searchQuery = searchParams.get('q') || '';
    const isSeller = user?.role === 'seller';

    const handleLogout = () => {
        setShowProfile(false);
        logout();
        navigate('/login', { replace: true });
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            navigate('/');
            return;
        }

        navigate(`/?q=${encodeURIComponent(trimmedQuery)}`);
    };

    return (
        <header className="navbox">
            <Link className="leftside" to="/home">
                <img
                    src={logo}
                    alt="StyleHub logo"
                    style={{ maxHeight: '56px', width: 'auto' }}
                />
                <span>StyleHub</span>
            </Link>

            <div className="nav-search" role="search">
                <span aria-hidden="true">Search</span>
                <input
                    type="search"
                    placeholder="Search for products, brands and more"
                    defaultValue={searchQuery}
                    onChange={handleSearch}
                    aria-label="Search products"
                />
            </div>

            <nav>
                <Link to="/home">Home</Link>
                <Link to="/tshirts">Men</Link>
                <Link to="/kurtis">Women</Link>
                {isSeller && <Link to="/admin">Admin</Link>}
                {isSeller && <Link to="/addproducts">Add</Link>}
                <Link className="cart-icon" to="/cartproducts" aria-label="Cart">
                    <span aria-hidden="true">Bag</span>
                    <span className="no-of-products">{cartTotals.quantity}</span>
                </Link>
                <button
                    className={`account-corner ${isSeller ? 'account-corner--seller' : 'account-corner--buyer'}`}
                    type="button"
                    onClick={() => setShowProfile(true)}
                    aria-label="Open account details"
                >
                    {isSeller ? (
                        <>
                            <span className="seller-icon" aria-hidden="true">🏬</span>
                            <span>Seller</span>
                        </>
                    ) : (
                        <>
                            <span className="user-avatar" aria-hidden="true">{(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}</span>
                            <span>Buyer</span>
                            <strong>{user?.displayName || 'My Account'}</strong>
                        </>
                    )}
                </button>
                <button className="logout-btn" type="button" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            {showProfile && (
                <div className="profile-drawer-backdrop" onClick={() => setShowProfile(false)}>
                    <aside className="profile-drawer" onClick={(event) => event.stopPropagation()} aria-label="Account details">
                        <header>
                            <div className="profile-avatar">{(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}</div>
                            <div>
                                <span>{isSeller ? 'Seller profile' : 'Buyer profile'}</span>
                                <h2>{user?.displayName || 'User'}</h2>
                            </div>
                            <button type="button" onClick={() => setShowProfile(false)} aria-label="Close account details">x</button>
                        </header>

                        <dl>
                            <div>
                                <dt>User ID</dt>
                                <dd>{user?.uid || 'Not available'}</dd>
                            </div>
                            <div>
                                <dt>Name</dt>
                                <dd>{user?.displayName || 'Not added'}</dd>
                            </div>
                            <div>
                                <dt>Email</dt>
                                <dd>{user?.email || 'Not added'}</dd>
                            </div>
                            <div>
                                <dt>Phone</dt>
                                <dd>{user?.phone || 'Not added'}</dd>
                            </div>
                            <div>
                                <dt>Address</dt>
                                <dd>{user?.address || 'Not added'}</dd>
                            </div>
                            <div>
                                <dt>Account type</dt>
                                <dd>{isSeller ? 'Seller' : 'Buyer'}</dd>
                            </div>
                        </dl>
                    </aside>
                </div>
            )}
        </header>
    );
};
