import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';

const fallbackAccessoryImage = 'https://images.pexels.com/photos/5380900/pexels-photo-5380900.jpeg?auto=compress&cs=tinysrgb&w=700';

const accessories = [
    {
        id: 'accessory-earrings-1',
        type: 'Earrings',
        name: 'Modern Gold Hoop Earrings',
        price: 699,
        image: 'https://images.pexels.com/photos/6689398/pexels-photo-6689398.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-earrings-2',
        type: 'Earrings',
        name: 'Pearl Drop Earrings',
        price: 899,
        image: 'https://images.pexels.com/photos/3881129/pexels-photo-3881129.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-earrings-3',
        type: 'Earrings',
        name: 'Gold Silver Party Earrings',
        price: 1099,
        image: 'https://images.pexels.com/photos/12194350/pexels-photo-12194350.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-bracelet-1',
        type: 'Bracelet',
        name: 'Pearl Charm Bracelet',
        price: 799,
        image: 'https://images.pexels.com/photos/17555285/pexels-photo-17555285.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-bracelet-2',
        type: 'Bracelet',
        name: 'Silver Stone Bracelet',
        price: 1199,
        image: 'https://images.pexels.com/photos/5380900/pexels-photo-5380900.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-bangles-1',
        type: 'Bangles',
        name: 'Colorful Festive Bangles',
        price: 599,
        image: 'https://images.pexels.com/photos/374090/pexels-photo-374090.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-bangles-2',
        type: 'Bangles',
        name: 'Gold Silver Bridal Bangles',
        price: 1499,
        image: 'https://images.pexels.com/photos/11495747/pexels-photo-11495747.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-bangles-3',
        type: 'Bangles',
        name: 'Emerald Diamond Bangles',
        price: 2499,
        image: 'https://images.pexels.com/photos/32988534/pexels-photo-32988534.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 'accessory-watch-1',
        type: 'Watch',
        name: 'Rose Gold Bracelet Watch',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1723683124663-e6ea3cc0ce89?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'accessory-watch-2',
        type: 'Watch',
        name: 'Classic Metal Strap Watch',
        price: 2799,
        image: 'https://images.unsplash.com/photo-1692764074545-f3bf45a9256b?auto=format&fit=crop&w=700&q=80',
    },
];

export const Accessories = () => {
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
            <main className="shop-page accessories-page">
                <section className="shop-hero accessories-hero">
                    <div>
                        <p className="cart-eyebrow">Women's Collection</p>
                        <h1>Accessories</h1>
                        <p>Earrings, bracelets, bangles, and watches to finish every outfit.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="accessories-grid" aria-label="Accessory options">
                    {accessories.map((accessory) => (
                        <article className="accessory-card" key={accessory.id}>
                            <img
                                className="accessory-img"
                                src={accessory.image}
                                alt={accessory.name}
                                onError={(event) => {
                                    event.currentTarget.src = fallbackAccessoryImage;
                                }}
                            />
                            <div className="accessory-card-body">
                                <span>{accessory.type}</span>
                                <h2>{accessory.name}</h2>
                                <strong>Rs {accessory.price.toLocaleString('en-IN')}.00</strong>
                                <button type="button" onClick={() => addToCart(accessory)}>
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
