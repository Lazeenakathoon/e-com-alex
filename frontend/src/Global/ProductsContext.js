import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { apiRequest } from '../Config/ApiConfig';
import slimFitJeansImage from '../images/Slim-Fited-Jeans.jpg';

const STORAGE_KEY = 'ecommerce_products';

const defaultProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 3299,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 3,
        name: 'Running Shoes',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 4,
        name: 'Bluetooth Speaker',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 5,
        name: 'Laptop Backpack',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 6,
        name: 'Sunglasses',
        price: 999,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 7,
        name: 'Mechanical Keyboard',
        price: 3899,
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 8,
        name: 'Ceramic Coffee Mug',
        price: 599,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 9,
        name: 'Fitness Yoga Mat',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 10,
        name: 'Desk Lamp',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 11,
        name: 'Canvas Tote Bag',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 12,
        name: 'Wireless Mouse',
        price: 799,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 13,
        name: 'Cotton T-shirt',
        price: 899,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 14,
        name: 'Graphic T-shirt',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 15,
        name: 'V-neck T-shirt',
        price: 799,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 16,
        name: 'Striped T-shirt',
        price: 999,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 17,
        name: 'Polo T-shirt',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 18,
        name: 'Athletic T-shirt',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 19,
        name: 'Long Sleeve T-shirt',
        price: 1399,
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 20,
        name: 'Henley T-shirt',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 31,
        name: 'Crew Neck T-shirt',
        price: 999,
        image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 32,
        name: 'Pocket T-shirt',
        price: 1099,
        image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 21,
        name: 'Slim Fit Jeans',
        price: 1999,
        image: '/images/Slim-Fit-Jeans.jpg',
    },
    {
        id: 22,
        name: 'Straight Leg Jeans',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 23,
        name: 'Skinny Jeans',
        price: 1899,
        image: 'https://unsplash.com/photos/0QDEj5dnUMk/download?force=true&w=700',
    },
    {
        id: 24,
        name: 'Bootcut Jeans',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1644866688031-af6d14986fa8?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 25,
        name: 'Relaxed Fit Jeans',
        price: 2099,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 26,
        name: 'Distressed Jeans',
        price: 2399,
        image: 'https://images.unsplash.com/photo-1641311821670-d746f909dc78?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 27,
        name: 'High-Waisted Jeans',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1718252540511-e958742e4165?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 28,
        name: 'Wide Leg Jeans',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1768696082603-5b7a9f0a10ab?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 29,
        name: 'Ripped Jeans',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1547597466-50406ff4f363?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 30,
        name: 'Classic Blue Jeans',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1714143136372-ddaf8b606da7?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 33,
        name: 'Black Slim Jeans',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1718252540511-e958742e4165?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
    {
        id: 34,
        name: 'Vintage Wash Jeans',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1714143136385-c449be6760f6?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=700',
    },
];

const ProductsContext = createContext(null);

const getSavedProducts = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

export const ProductsProvider = ({ children }) => {
    const [customProducts, setCustomProducts] = useState(getSavedProducts);
    const [serverProducts, setServerProducts] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await apiRequest('/products');
                setServerProducts(data.products);
            } catch {
                setServerProducts(null);
            }
        };

        loadProducts();
    }, []);

    const addProduct = (product) => {
        const nextProduct = {
            ...product,
            id: `custom-${Date.now()}`
        };
        const nextProducts = [nextProduct, ...customProducts];

        setCustomProducts(nextProducts);
        setServerProducts((currentProducts) => (
            currentProducts ? [nextProduct, ...currentProducts] : currentProducts
        ));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));

        apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(product),
        }).then((data) => {
            setServerProducts((currentProducts) => (
                currentProducts
                    ? currentProducts.map((savedProduct) =>
                        savedProduct.id === nextProduct.id ? data.product : savedProduct
                    )
                    : currentProducts
            ));
        }).catch(() => {
            // Keep local fallback product when the backend is not running.
        });

        return nextProduct;
    };

    const deleteProduct = async (productId) => {
        const nextCustomProducts = customProducts.filter((product) => product.id !== productId);
        const nextServerProducts = serverProducts ? serverProducts.filter((product) => product.id !== productId) : serverProducts;

        setCustomProducts(nextCustomProducts);
        setServerProducts(nextServerProducts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCustomProducts));

        try {
            await apiRequest(`/products/${encodeURIComponent(productId)}`, {
                method: 'DELETE',
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message || 'Unable to delete product' };
        }
    };

    const products = useMemo(() => {
        const baseProducts = serverProducts && serverProducts.length > 0
            ? serverProducts
            : [...defaultProducts];

        const mergedProducts = [
            ...defaultProducts,
            ...baseProducts.filter((product) =>
                !defaultProducts.some((defaultProduct) => defaultProduct.id === product.id)
            ),
        ];

        const imageOverrides = {
            '/images/Slim-Fited-Jeans.jpg': slimFitJeansImage,
        };

        return [...customProducts, ...mergedProducts].map((product) => ({
            ...product,
            image: imageOverrides[product.image] || product.image,
        }));
    }, [customProducts, serverProducts]);

    return (
        <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);

    if (!context) {
        throw new Error('useProducts must be used within ProductsProvider');
    }

    return context;
};
