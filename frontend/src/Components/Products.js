import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { useProducts } from '../Global/ProductsContext';
import { shoesProducts, sandalsProducts } from '../data/CategoryProducts';

export const Products = () => {
    const [showMenCategories, setShowMenCategories] = useState(false);
    const [showWomenCategories, setShowWomenCategories] = useState(false);
    const [searchParams] = useSearchParams();
    const { products } = useProducts();
    const { addToCart: saveToCart } = useCart();
    const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

    const normalizedSearchTerms = searchQuery
        .replace(/[-_]+/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

    const maleTerms = ['man', 'men', 'male', 'guy', 'gent'];
    const femaleTerms = ['woman', 'women', 'female', 'girl', 'girls', 'lady'];
    const hasMaleTerm = normalizedSearchTerms.some((term) => maleTerms.includes(term));
    const hasFemaleTerm = normalizedSearchTerms.some((term) => femaleTerms.includes(term));

    const categoryMatches = [];
    const shoesTerms = ['shoe', 'shoes', 'sneaker', 'sneakers', 'boot', 'boots', 'loafer', 'loafers', 'trainer', 'trainers', 'footwear'];
    const sandalsTerms = ['sandal', 'sandals', 'heel', 'platform', 'flip', 'slide', 'footwear'];

    if (normalizedSearchTerms.some((term) => shoesTerms.includes(term))) {
        categoryMatches.push(...shoesProducts);
    }

    if (normalizedSearchTerms.some((term) => sandalsTerms.includes(term))) {
        categoryMatches.push(...sandalsProducts);
    }

    const searchCandidates = [...products, ...categoryMatches].filter(
        (product, index, self) => self.findIndex((item) => item.id === product.id) === index
    );

    const filteredProducts = searchQuery
        ? searchCandidates.filter((product) => {
            const name = product.name.toLowerCase();
            const category = (product.category || '').toLowerCase();
            const tags = (product.tags || []).map((tag) => tag.toLowerCase());
            const searchable = [name, category, ...tags].join(' ');

            if (hasMaleTerm && product.gender && product.gender !== 'men' && product.gender !== 'unisex') {
                return false;
            }

            if (hasFemaleTerm && product.gender && product.gender !== 'women' && product.gender !== 'unisex') {
                return false;
            }

            return normalizedSearchTerms.every((term) => {
                if (maleTerms.includes(term) || femaleTerms.includes(term)) {
                    return true;
                }

                return searchable.includes(term);
            });
        })
        : products;

    const isSearching = Boolean(searchQuery);

    const addToCart = (product) => {
        const result = saveToCart(product);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <main className="shop-page">
            <section className="shop-hero">
                <div>
                    <p className="cart-eyebrow">Online fashion store</p>
                    <h1>Big Style Finds</h1>
                    <p>Fresh picks, sharp prices, and your newest additions in one place.</p>
                </div>
                <Link to="/cartproducts">View Bag</Link>
            </section>

            <section className="offer-strip" aria-label="Offers">
                <span>Flat deals</span>
                <strong>New season essentials</strong>
                <span>Free delivery on top picks</span>
            </section>

            {!isSearching && (
                <section className="gender-section" aria-label="Shop by category">
                    <article className="gender-card gender-card--men">
                        <div>
                            <p className="gender-eyebrow">Street-ready</p>
                            <h2>Man Collection</h2>
                            <p>Timeless layers, bold shapes, and smart everyday essentials.</p>
                        </div>
                        <button
                            type="button"
                            className="gender-cta"
                            onClick={() => setShowMenCategories((visible) => !visible)}
                            aria-expanded={showMenCategories}
                        >
                            {showMenCategories ? 'Hide Men Sections' : 'Show Men Sections'}
                        </button>
                    </article>
                    <article className="gender-card gender-card--women">
                        <div>
                            <p className="gender-eyebrow">Bright edit</p>
                            <h2>Woman Collection</h2>
                            <p>Curated styles with fresh color, texture, and modern polish.</p>
                        </div>
                        <button
                            type="button"
                            className="gender-cta"
                            onClick={() => setShowWomenCategories((visible) => !visible)}
                            aria-expanded={showWomenCategories}
                        >
                            Shop Now
                        </button>
                    </article>
                </section>
            )}

            {!isSearching && showMenCategories && (
                <section className="men-category-panel" aria-label="Men's categories">
                    <Link className="man-category-card" to="/tshirts">T-shirts</Link>
                    <Link className="man-category-card" to="/jeans">Jeans</Link>
                    <Link className="man-category-card" to="/shoes">Shoes</Link>
                    <Link className="man-category-card" to="/watches">Watches</Link>
                </section>
            )}

            {!isSearching && showWomenCategories && (
                <nav className="women-mini-nav" aria-label="Women's categories">
                    <Link to="/kurtis">Kurtis</Link>
                    <Link to="/sandals">Sandals</Link>
                    <Link to="/sarees">Sarees</Link>
                    <Link to="/accessories">Accessories</Link>
                </nav>
            )}

            {isSearching && (
                <section className="search-results-summary" aria-label="Search results summary">
                    <p>
                        Showing {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'} for "{searchParams.get('q')}"
                    </p>
                </section>
            )}

            <section className="products-container" aria-label="Products">
                {filteredProducts.map((product) => (
                    <article className="product-card" key={product.id}>
                        <img className="product-img" src={product.image} alt={product.name} />
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
                ))}
            </section>

            {filteredProducts.length === 0 && (
                <p className="empty-products">No products found for "{searchParams.get('q')}". Try jeans, t-shirt, shoes, watches, or accessories.</p>
            )}
        </main>
    );
};
