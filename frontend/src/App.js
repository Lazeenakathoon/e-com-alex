import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddProducts } from './Components/AddProducts';
import { Accessories } from './Components/Accessories';
import { AdminPanel } from './Components/AdminPanel';
import { Cashout } from './Components/Cashout';
import { CartProducts } from './Components/CartProducts';
import { Chatbot } from './Components/Chatbot';
import { FloatingStyleBot } from './Components/FloatingStyleBot';
import { Home } from './Components/Home';
import { Jeans } from './Components/Jeans';
import { Kurtis } from './Components/Kurtis';
import { Login } from './Components/Login';
import { Sandals } from './Components/Sandals';
import { Sarees } from './Components/Sarees';
import { Shoes } from './Components/Shoes';
import { Signup } from './Components/Signup';
import { TShirts } from './Components/TShirts';
import { Watches } from './Components/Watches';
import { AuthProvider, useAuth } from './Global/AuthContext';
import { CartProvider } from './Global/CartContext';
import { ProductsProvider } from './Global/ProductsContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const SellerRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return user?.role === 'seller' ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
    return (
        <AuthProvider>
            <ProductsProvider>
                <CartProvider>
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                            <Route path="/singnup" element={<Navigate to="/signup" replace />} />
                            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/admin" element={<SellerRoute><AdminPanel /></SellerRoute>} />
                            <Route path="/assistant" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
                            <Route path="/addproducts" element={<SellerRoute><AddProducts /></SellerRoute>} />
                            <Route path="/add-products" element={<SellerRoute><AddProducts /></SellerRoute>} />
                            <Route path="/cashout" element={<ProtectedRoute><Cashout /></ProtectedRoute>} />
                            <Route path="/checkout" element={<ProtectedRoute><Cashout /></ProtectedRoute>} />
                            <Route path="/cart" element={<ProtectedRoute><CartProducts /></ProtectedRoute>} />
                            <Route path="/cart-products" element={<ProtectedRoute><CartProducts /></ProtectedRoute>} />
                            <Route path="/cartproducts" element={<ProtectedRoute><CartProducts /></ProtectedRoute>} />
                            <Route path="/tshirts" element={<ProtectedRoute><TShirts /></ProtectedRoute>} />
                            <Route path="/jeans" element={<ProtectedRoute><Jeans /></ProtectedRoute>} />
                            <Route path="/shoes" element={<ProtectedRoute><Shoes /></ProtectedRoute>} />
                            <Route path="/watches" element={<ProtectedRoute><Watches /></ProtectedRoute>} />
                            <Route path="/kurtis" element={<ProtectedRoute><Kurtis /></ProtectedRoute>} />
                            <Route path="/sandals" element={<ProtectedRoute><Sandals /></ProtectedRoute>} />
                            <Route path="/sarees" element={<ProtectedRoute><Sarees /></ProtectedRoute>} />
                            <Route path="/accessories" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                        <FloatingStyleBot />
                        <ToastContainer position="top-center" />
                    </BrowserRouter>
                </CartProvider>
            </ProductsProvider>
        </AuthProvider>
    );
}

export default App;
