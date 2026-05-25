const crypto = require('crypto');
const { jwtSecret } = require('../config/env');

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return { salt, hash };
};

const createToken = (user) => {
    const payload = Buffer.from(JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: user.role || 'buyer',
        exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    })).toString('base64url');
    const signature = crypto
        .createHmac('sha256', jwtSecret)
        .update(payload)
        .digest('base64url');

    return `${payload}.${signature}`;
};

const verifyToken = (token) => {
    if (!token || !token.includes('.')) {
        return null;
    }

    const [payload, signature] = token.split('.');
    const expectedSignature = crypto
        .createHmac('sha256', jwtSecret)
        .update(payload)
        .digest('base64url');

    if (signature !== expectedSignature) {
        return null;
    }

    try {
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (decoded.exp < Date.now()) {
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
};

const publicUser = (user) => ({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    role: user.role || 'buyer',
});

const requireAuth = (request, response, next) => {
    const header = request.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    const decoded = verifyToken(token);

    if (!decoded) {
        response.status(401).json({ message: 'Please log in again.' });
        return;
    }

    request.user = decoded;
    next();
};

const requireSeller = (request, response, next) => {
    if (request.user?.role !== 'seller') {
        response.status(403).json({ message: 'Seller access is required.' });
        return;
    }

    next();
};

module.exports = {
    hashPassword,
    createToken,
    verifyToken,
    publicUser,
    requireAuth,
    requireSeller,
};
