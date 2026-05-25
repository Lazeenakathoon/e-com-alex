import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Global/AuthContext';
import { useCart } from '../Global/CartContext';
import { Navbar } from './Navbar';

export const Cashout = () => {
    const [cellNo, setCellNo] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartTotals } = useCart();

    const name = user?.displayName || user?.email || '';

    const submitOrder = (event) => {
        event.preventDefault();

        if (!name || !cellNo.trim() || !deliveryAddress.trim()) {
            toast.error('Please fill in all checkout details.');
            return;
        }

        setIsSubmitting(true);
        toast.success(
            'Your order has been placed successfully. You will be redirected to the home page after 5 seconds.'
        );

        setTimeout(() => {
            navigate('/', { replace: true });
        }, 8000);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Checkout Details</h2>
                <form onSubmit={submitOrder}>
                    <label htmlFor="checkout-name">Name</label>
                    <input
                        id="checkout-name"
                        type="text"
                        value={name}
                        readOnly
                    />

                    <label htmlFor="checkout-cell">Cell No</label>
                    <input
                        id="checkout-cell"
                        type="tel"
                        placeholder="eg 03123456789"
                        value={cellNo}
                        onChange={(event) => setCellNo(event.target.value)}
                        disabled={isSubmitting}
                    />

                    <label htmlFor="checkout-address">Delivery Address</label>
                    <input
                        id="checkout-address"
                        type="text"
                        value={deliveryAddress}
                        onChange={(event) => setDeliveryAddress(event.target.value)}
                        disabled={isSubmitting}
                    />

                    <label htmlFor="checkout-price">Price To Pay</label>
                    <input
                        id="checkout-price"
                        type="number"
                        value={cartTotals.price}
                        readOnly
                    />

                    <label htmlFor="checkout-products">Total No of Products</label>
                    <input
                        id="checkout-products"
                        type="number"
                        value={cartTotals.quantity}
                        readOnly
                    />

                    <button type="submit" disabled={isSubmitting}>
                        SUBMIT
                    </button>
                </form>
            </div>
        </>
    );
};
