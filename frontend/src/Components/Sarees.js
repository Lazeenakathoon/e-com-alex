import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';

const fallbackSareeImage = 'https://images.pexels.com/photos/8229217/pexels-photo-8229217.jpeg?auto=compress&cs=tinysrgb&w=700';

const sarees = [
    {
        id: 'saree-1',
        name: 'Vibrant Garden Printed Saree',
        price: 2499,
        description: 'A bright festive saree with lively colors, perfect for daytime functions and family gatherings.',
        image: 'https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'saree-2',
        name: 'Royal Blue Embroidered Saree',
        price: 3199,
        description: 'Elegant blue drape with traditional jewelry styling, made for celebrations and evening wear.',
        image: 'https://images.unsplash.com/photo-1731131400094-8de05619131a?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'saree-3',
        name: 'Orange Festive Saree',
        price: 2799,
        description: 'A warm festive saree with graceful detailing for puja, mehendi, and seasonal occasions.',
        image: 'https://images.unsplash.com/photo-1754782738699-17a5c9921db2?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'saree-4',
        name: 'Classic Red Bridal Saree',
        price: 5499,
        description: 'Rich red saree with a bridal feel, ideal for wedding events, receptions, and grand styling.',
        image: 'https://images.unsplash.com/photo-1717835943315-b818e90cb2a1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'saree-5',
        name: 'Heritage Red Silk Saree',
        price: 4999,
        description: 'Traditional red silk-inspired drape with a polished ethnic look for festive wardrobes.',
        image: 'https://images.pexels.com/photos/14596121/pexels-photo-14596121.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'saree-6',
        name: 'Luxury Silk Party Saree',
        price: 4599,
        description: 'A premium party saree with a smooth silk look and elegant fall for special evenings.',
        image: 'https://images.pexels.com/photos/29049398/pexels-photo-29049398.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'saree-7',
        name: 'Kolkata Red Traditional Saree',
        price: 2899,
        description: 'Simple, graceful, and rooted in tradition, this red saree works beautifully for cultural events.',
        image: 'https://images.pexels.com/photos/12327758/pexels-photo-12327758.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'saree-8',
        name: 'Ivory Bengali Style Saree',
        price: 3499,
        description: 'Soft ivory saree styling with a timeless ethnic mood for elegant daytime celebrations.',
        image: 'https://unsplash.com/photos/a-woman-in-a-sari-is-standing-in-a-train-station-MzHYcsJPxwg',
    },
    {
        id: 'saree-9',
        name: 'Printed Cotton Saree',
        price: 1999,
        description: 'Lightweight cotton-inspired saree for office wear, casual outings, and everyday comfort.',
        image: 'https://www.pexels.com/photo/elegant-woman-in-traditional-bangladeshi-attire-outdoors-36981200/',
    },
    {
        id: 'saree-10',
        name: 'Designer Event Saree',
        price: 3999,
        description: 'A stylish event-ready saree with a modern fashion pose and festive statement appeal.',
        image: 'https://www.pexels.com/photo/a-woman-on-a-runway-12850138/',
    },
];

export const Sarees = () => {
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
            <main className="shop-page sarees-page">
                <section className="shop-hero sarees-hero">
                    <div>
                        <p className="cart-eyebrow">Women's Collection</p>
                        <h1>Sarees</h1>
                        <p>Festive silk looks, printed everyday drapes, and statement sarees ready to shop.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="sarees-grid" aria-label="Saree options">
                    {sarees.map((saree) => (
                        <article className="saree-card" key={saree.id}>
                            <img
                                className="saree-img"
                                src={saree.image}
                                alt={saree.name}
                                onError={(event) => {
                                    event.currentTarget.src = fallbackSareeImage;
                                }}
                            />
                            <div className="saree-card-body">
                                <span>Designer Saree</span>
                                <h2>{saree.name}</h2>
                                <p>{saree.description}</p>
                                <strong>Rs {saree.price.toLocaleString('en-IN')}.00</strong>
                                <button type="button" onClick={() => addToCart(saree)}>
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
