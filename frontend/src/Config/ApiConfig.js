const normalizeApiBaseUrl = (url) => {
    const baseUrl = url.trim().replace(/\/+$/, '');
    return /\/api$/i.test(baseUrl) ? baseUrl : `${baseUrl}/api`;
};

const getDefaultApiBaseUrl = () => {
    if (process.env.REACT_APP_API_URL) {
        return normalizeApiBaseUrl(process.env.REACT_APP_API_URL);
    }

    if (process.env.NODE_ENV === 'development') {
        return 'https://eduloanplus.onrender.com/api';
    }

    return '/api';
};

export const API_BASE_URL = getDefaultApiBaseUrl();

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
        throw new Error(`Cannot reach the backend API at ${API_BASE_URL}. Check REACT_APP_API_URL and the backend deployment.`);
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};
