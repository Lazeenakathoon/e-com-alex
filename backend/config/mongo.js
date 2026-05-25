const { MongoClient } = require('mongodb');
const { mongoUri, mongoDbName } = require('./env');

const useMongoEnv = Boolean(mongoUri);
const client = useMongoEnv ? new MongoClient(mongoUri) : null;
let db = null;
let mongoConnected = false;

const connectMongo = async () => {
    if (!useMongoEnv) {
        return;
    }

    try {
        await client.connect();
        db = client.db(mongoDbName);
        mongoConnected = true;
        console.log(`MongoDB connected to database: ${mongoDbName}`);
    } catch (error) {
        mongoConnected = false;
        console.warn('MongoDB connection failed. Falling back to local file storage.', error.message || error);
    }
};

const useMongo = () => useMongoEnv && mongoConnected;

const getCollection = (collectionName) => db?.collection(collectionName);

module.exports = {
    connectMongo,
    getCollection,
    useMongo,
};
