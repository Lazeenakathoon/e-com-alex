const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
const enableMongo = process.env.ENABLE_MONGO === 'true';
const mongoUri = enableMongo ? process.env.MONGO_URI?.trim() : undefined;
const mongoDbName = process.env.MONGO_DB_NAME?.trim() || 'stylehub';
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const geminiModel = process.env.GEMINI_MODEL?.trim() || 'gemini-pro';

module.exports = {
    port,
    jwtSecret,
    enableMongo,
    mongoUri,
    mongoDbName,
    clientOrigin,
    geminiModel,
};
