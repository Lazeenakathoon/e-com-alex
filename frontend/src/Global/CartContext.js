import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { apiRequest } from '../Config/ApiConfig';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'ecommerce_cart';

const CartContext = createContext(null);

const getSavedCart = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState(getSavedCart);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const loadCart = async () => {
            if (!isAuthenticated) {
                setCartProducts([]);
                return;
            }

            try {
                const data = await apiRequest('/cart');
                setCartProducts(data.cart);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.cart));
            } catch {
                setCartProducts(getSavedCart());
            }
        };

        loadCart();
    }, [isAuthenticated]);

    const saveCart = (products) => {
        setCartProducts(products);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

        if (isAuthenticated) {
            apiRequest('/cart', {
                method: 'PUT',
                body: JSON.stringify({ cart: products }),
            }).catch(() => {
                // Keep the local cart if the backend is unavailable.
            });
        }
    };

    const addToCart = (product) => {
        const isAlreadyInCart = cartProducts.some(
            (cartProduct) => cartProduct.id === product.id
        );

        if (isAlreadyInCart) {
            return {
                success: false,
                message: 'this product is already in your cart'
            };
        }

        saveCart([
            ...cartProducts,
            {
                ...product,
                quantity: 1
            }
        ]);

        return {
            success: true,
            message: 'added to cart!'
        };
    };

    const increaseQuantity = (productId) => {
        saveCart(
            cartProducts.map((product) =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    const decreaseQuantity = (productId) => {
        saveCart(
            cartProducts.map((product) =>
                product.id === productId
                    ? { ...product, quantity: Math.max(1, product.quantity - 1) }
                    : product
            )
        );
    };

    const removeProduct = (productId) => {
        saveCart(cartProducts.filter((product) => product.id !== productId));
    };

    const cartTotals = useMemo(() => {
        return cartProducts.reduce(
            (totals, product) => ({
                quantity: totals.quantity + product.quantity,
                price: totals.price + product.price * product.quantity,
            }),
            { quantity: 0, price: 0 }
        );
    }, [cartProducts]);

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                cartTotals,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeProduct
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }

    return context;
};
