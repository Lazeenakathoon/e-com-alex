const defaultApiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_BASE_URL = defaultApiBaseUrl;

export const AUTH_TOKEN_KEY = 'ecommerce_api_token';
export const AUTH_USER_KEY = 'ecommerce_api_user';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthSession = ({ token, user }) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const getSavedAuthUser = () => {
    try {
        return JSON.parse(localStorage.getItem(AUTH_USER_KEY));
    } catch {
        return null;
    }
};

export const clearAuthSession = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
};

export const apiRequest = async (path, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers,
        });
    } catch {
        throw new Error('Cannot reach the backend API. Please make sure the backend server is running on http://localhost:5000.');
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};
