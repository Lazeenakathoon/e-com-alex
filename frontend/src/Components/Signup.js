import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Global/AuthContext';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { signup: signupUser } = useAuth();

    const signup = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Required field validation
        if (!name.trim()) {
            toast.error('Name is required');
            setIsLoading(false);
            return;
        }

        if (!email.trim()) {
            toast.error('Email is required');
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            toast.error('Password is required');
            setIsLoading(false);
            return;
        }

        // Email format validation
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            toast.error('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Password length validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        setErrorMessage('');

        try {
            const result = await signupUser(name, email, password, role);
            if (result.success) {
                toast.success('Signup successful! Redirecting to home.');
                navigate('/');
            } else {
                const message = result.error || 'Signup failed. Please try again.';
                setErrorMessage(message);
                toast.error(message);
            }
        } catch (error) {
            const message = error.message || 'An error occurred during signup';
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <br />
            <h2>Sign up</h2>
            <br />
            <form onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    disabled={isLoading}
                />
                <br />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={isLoading}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    disabled={isLoading}
                />
                <br />
                <label htmlFor="role">Account type</label>
                <select
                    id="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    disabled={isLoading}
                >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'SIGNING UP...' : 'SUBMIT'}
                </button>

                {errorMessage && (
                    <div className="error-message" style={{ marginTop: '1rem', color: '#d32f2f' }}>
                        {errorMessage}
                    </div>
                )}
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};
