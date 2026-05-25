import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Global/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { login: loginUser } = useAuth();

    const login = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Validation
        if (!email || !password) {
            toast.error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            toast.error('Please enter a valid email');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters');
            setIsLoading(false);
            return;
        }

        setErrorMessage('');

        try {
            const result = await loginUser(email, password);

            if (result.success) {
                toast.success('Login successful!');
                navigate('/');
            } else {
                const message = result.error || 'Login failed. Please check your credentials.';
                setErrorMessage(message);
                toast.error(message);
            }
        } catch (error) {
            const message = error.message || 'An error occurred during login';
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>

            <form onSubmit={login}>

                {/* Email */}
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={isLoading}
                />

                <br />

                {/* Password */}
                <label htmlFor="password">Password</label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    disabled={isLoading}
                />

                <br />

                {/* Submit Button */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                </button>

                {errorMessage && (
                    <div className="error-message" style={{ marginTop: '1rem', color: '#d32f2f' }}>
                        {errorMessage}
                    </div>
                )}
            </form>

            <p>
                Need an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};
