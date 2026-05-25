const fs = require('fs');
const path = require('path');
const { getCollection, useMongo } = require('../config/mongo');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

const seedProducts = [
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
        id: 21,
        name: 'Slim Fit Jeans',
        price: 1999,
        image: '/images/Slim-Fited-Jeans.jpg',
    },
    {
        id: 22,
        name: 'Straight Leg Jeans',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 23,
        name: 'Skinny Jeans',
        price: 1899,
        image: 'https://images.unsplash.com/photo-JqZuDdtEUls?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 24,
        name: 'Bootcut Jeans',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
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
        image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9cfdc?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 27,
        name: 'High-Waisted Jeans',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 28,
        name: 'Wide Leg Jeans',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 29,
        name: 'Ripped Jeans',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1556909204-70d3af3e00b0?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 30,
        name: 'Classic Blue Jeans',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 33,
        name: 'Black Slim Jeans',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 34,
        name: 'Vintage Wash Jeans',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=600&q=80',
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
];

const ensureLocalDb = () => {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        fs.writeFileSync(dbPath, JSON.stringify({ users: [], products: [], carts: {} }, null, 2));
    }
};

const readLocalDb = () => {
    ensureLocalDb();
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const writeLocalDb = (payload) => {
    ensureLocalDb();
    fs.writeFileSync(dbPath, JSON.stringify(payload, null, 2));
};

const findUserByEmail = async (email) => {
    if (useMongo()) {
        return getCollection('users').findOne({ email });
    }

    const localDb = readLocalDb();
    return localDb.users.find((user) => user.email === email);
};

const findUserByUid = async (uid) => {
    if (useMongo()) {
        return getCollection('users').findOne({ uid });
    }

    const localDb = readLocalDb();
    return localDb.users.find((user) => user.uid === uid);
};

const addUser = async (user) => {
    if (useMongo()) {
        await getCollection('users').insertOne(user);
        return;
    }

    const localDb = readLocalDb();
    localDb.users.push(user);
    localDb.carts[user.uid] = [];
    writeLocalDb(localDb);
};

const getProducts = async () => {
    if (useMongo()) {
        const storedProducts = await getCollection('products')
            .find()
            .sort({ _id: -1 })
            .toArray();

        return [...storedProducts, ...seedProducts];
    }

    const localDb = readLocalDb();
    return [...localDb.products, ...seedProducts];
};

const addProduct = async (product) => {
    if (useMongo()) {
        await getCollection('products').insertOne(product);
        return;
    }

    const localDb = readLocalDb();
    localDb.products.unshift(product);
    writeLocalDb(localDb);
};

const removeProduct = async (productId) => {
    if (useMongo()) {
        const result = await getCollection('products').deleteOne({ id: productId });
        return result.deletedCount > 0;
    }

    const localDb = readLocalDb();
    const index = localDb.products.findIndex((product) => String(product.id) === String(productId));
    if (index === -1) {
        return false;
    }

    localDb.products.splice(index, 1);
    writeLocalDb(localDb);
    return true;
};

const getCart = async (uid) => {
    if (useMongo()) {
        const cart = await getCollection('carts').findOne({ uid });
        return cart?.items || [];
    }

    const localDb = readLocalDb();
    return localDb.carts[uid] || [];
};

const updateCart = async (uid, cart) => {
    if (useMongo()) {
        await getCollection('carts').updateOne(
            { uid },
            { $set: { uid, items: cart } },
            { upsert: true }
        );
        return;
    }

    const localDb = readLocalDb();
    localDb.carts[uid] = cart;
    writeLocalDb(localDb);
};

module.exports = {
    findUserByEmail,
    findUserByUid,
    addUser,
    getProducts,
    addProduct,
    removeProduct,
    getCart,
    updateCart,
};
