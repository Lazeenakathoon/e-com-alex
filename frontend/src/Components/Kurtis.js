import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';

const fallbackKurtiImage = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80';

const kurtis = [
    {
        id: 'kurti-short-1',
        type: 'Short Kurti',
        name: 'Block Print Cotton Short Kurti',
        price: 899,
        size: 'S, M, L',
        image: 'https://images.unsplash.com/photo-1649140336436-f0ede5576a5c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'kurti-short-2',
        type: 'Short Kurti',
        name: 'Indigo Everyday Short Kurti',
        price: 999,
        size: 'M, L, XL',
        image: 'https://images.unsplash.com/photo-1649140336797-a22709626a44?auto=format&fit=crop&w=700&q=80',
    },
    {
        id: 'kurti-short-3',
        type: 'Short Kurti',
        name: 'Floral Rayon Short Kurti',
        price: 1099,
        size: 'S, M, L, XL',
        image: 'https://images.unsplash.com/photo-1605763904409-a712a9a50323?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'kurti-short-4',
        type: 'Short Kurti',
        name: 'Printed Collar Short Kurti',
        price: 1199,
        size: 'XS, S, M',
        image: 'https://images.unsplash.com/photo-1768478701502-c6b378f85167?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'kurti-short-5',
        type: 'Short Kurti',
        name: 'Pastel Chikankari Short Kurti',
        price: 1299,
        size: 'S, M, L',
        image: 'https://images.unsplash.com/photo-1702468507274-48e7175e4ebb?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
   {
    id: 'kurti-long-1',
    type: 'Long Kurti',
    name: 'White Chikankari Anarkali Kurti',
    price: 1799,
    size: 'M, L, XL',
    image: 'https://images.unsplash.com/photo-1702974981877-fc22e41ef833?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
},
    {
        id: 'kurti-long-2',
        type: 'Long Kurti',
        name: 'Festive Silk Blend Long Kurti',
        price: 1999,
        size: 'S, M, L, XL',
        image: 'https://images.unsplash.com/photo-1669197799007-a2148da3d7c4?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'kurti-long-3',
        type: 'Long Kurti',
        name: 'Straight Fit Printed Long Kurti',
        price: 1499,
        size: 'S, M, L',
        image: 'https://images.unsplash.com/photo-1580708570642-2ac35ad8d678?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'kurti-long-4',
        type: 'Long Kurti',
        name: 'Maroon Workwear Long Kurti',
        price: 1599,
        size: 'M, L, XL, XXL',
        image: 'https://images.unsplash.com/photo-1708534419572-6e6614a53ca1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 'kurti-long-5',
        type: 'Long Kurti',
        name: 'Green Ethnic Long Kurti',
        price: 1899,
        size: 'S, M, L, XL',
        image: 'https://images.unsplash.com/photo-1693991027661-688429b3a538?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
];

export const Kurtis = () => {
    const { addToCart: saveToCart } = useCart();
    const shortKurtis = kurtis.filter((kurti) => kurti.type === 'Short Kurti');
    const longKurtis = kurtis.filter((kurti) => kurti.type === 'Long Kurti');

    const addToCart = (product) => {
        const result = saveToCart(product);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const renderKurtiCard = (kurti) => (
        <article className="kurti-card" key={kurti.id}>
            <img
                className="kurti-img"
                src={kurti.image}
                alt={kurti.name}
                onError={(event) => {
                    event.currentTarget.src = fallbackKurtiImage;
                }}
            />
            <div className="kurti-card-body">
                <span>{kurti.type}</span>
                <h2>{kurti.name}</h2>
                <p>Size: {kurti.size}</p>
                <strong>Rs {kurti.price.toLocaleString('en-IN')}.00</strong>
                <button type="button" onClick={() => addToCart(kurti)}>
                    Add Kurti To Cart
                </button>
            </div>
        </article>
    );

    return (
        <>
            <Navbar />
            <main className="shop-page kurti-page">
                <section className="shop-hero kurti-hero">
                    <div>
                        <p className="cart-eyebrow">Women's Collection</p>
                        <h1>Kurtis</h1>
                        <p>Short everyday styles and long festive fits with prices and sizes ready.</p>
                    </div>
                    <Link to="/cartproducts">View Bag</Link>
                </section>

                <section className="kurti-section" aria-labelledby="short-kurtis">
                    <div className="kurti-section-header">
                        <p className="cart-eyebrow">5 styles</p>
                        <h2 id="short-kurtis">Short Kurtis</h2>
                    </div>
                    <div className="kurti-grid">
                        {shortKurtis.map(renderKurtiCard)}
                    </div>
                </section>

                <section className="kurti-section" aria-labelledby="long-kurtis">
                    <div className="kurti-section-header">
                        <p className="cart-eyebrow">5 styles</p>
                        <h2 id="long-kurtis">Long Kurtis</h2>
                    </div>
                    <div className="kurti-grid">
                        {longKurtis.map(renderKurtiCard)}
                    </div>
                </section>
            </main>
        </>
    );
};
