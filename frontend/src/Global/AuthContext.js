import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import {
    apiRequest,
    clearAuthSession,
    getSavedAuthUser,
    setAuthSession
} from '../Config/ApiConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getSavedAuthUser);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getSavedAuthUser()));

    const setAuthenticatedUser = (currentUser) => {
        setUser(currentUser);
        setIsAuthenticated(Boolean(currentUser));
    };

    useEffect(() => {
        const verifySession = async () => {
            if (!getSavedAuthUser()) {
                return;
            }

            try {
                const data = await apiRequest('/auth/me');
                setAuthenticatedUser(data.user);
            } catch {
                clearAuthSession();
                setAuthenticatedUser(null);
            }
        };

        verifySession();
    }, []);

    const signup = async (name, email, password, role = 'buyer') => {
        try {
            const data = await apiRequest('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password, role }),
            });

            setAuthSession(data);
            setAuthenticatedUser(data.user);

            return {
                success: true,
                user: data.user,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    };

    const login = async (email, password) => {
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            setAuthSession(data);
            setAuthenticatedUser(data.user);

            return {
                success: true,
                user: data.user,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    };

    const logout = async () => {
        clearAuthSession();
        localStorage.removeItem('ecommerce_cart');
        setAuthenticatedUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signup,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
