
const cors = require('cors');
const express = require('express');

const { port, clientOrigins, enableMongo, geminiModel } = require('./config/env');
const { connectMongo, useMongo } = require('./config/mongo');
const {
    hashPassword,
    createToken,
    publicUser,
    requireAuth,
    requireSeller,
} = require('./global/auth');
const {
    findUserByEmail,
    findUserByUid,
    addUser,
    getProducts,
    addProduct,
    removeProduct,
    getCart,
    updateCart,
} = require('./global/storage');

const app = express();

app.use(cors({
    origin: clientOrigins,
    credentials: true,
}));
app.use(express.json({ limit: '8mb' }));

app.get('/api/health', (request, response) => {
    response.json({ ok: true, service: 'stylehub-backend' });
});

const findProducts = (products, keywords, fallback = []) => {
    const matches = products.filter((product) => {
        const name = product.name.toLowerCase();
        return keywords.some((keyword) => name.includes(keyword));
    });

    return matches.length ? matches : fallback.map((name, index) => ({ id: `fallback-${index}`, name, price: 0 }));
};

const formatProductNames = (items) => items.slice(0, 3).map((item) => item.name).join(', ');

const buildLocalShoppingReply = (message, products) => {
    const lowerMessage = message.toLowerCase();
    const jeans = findProducts(products, ['jeans'], ['Slim Fit Jeans', 'Classic Blue Jeans', 'Straight Leg Jeans']);
    const tshirts = findProducts(products, ['t-shirt', 'shirt', 'tee'], ['Cotton T-shirt', 'Graphic T-shirt', 'Polo T-shirt']);
    const shoes = findProducts(products, ['shoes', 'sneaker'], ['Running Shoes', 'White Sneakers']);
    const watches = findProducts(products, ['watch'], ['Smart Watch']);
    const kurtis = findProducts(products, ['kurti'], ['Printed Kurti', 'Straight Kurti']);
    const sandals = findProducts(products, ['sandal'], ['Tan Sandals', 'Block Heel Sandals']);
    const sarees = findProducts(products, ['saree'], ['Silk Saree', 'Cotton Saree']);
    const accessories = findProducts(products, ['bag', 'sunglasses', 'accessor', 'watch'], ['Sunglasses', 'Canvas Tote Bag', 'Smart Watch']);

    if (lowerMessage.includes('blue jeans') || lowerMessage.includes('jeans')) {
        return [
            `Best match: ${jeans[0].name} with ${tshirts[0].name}.`,
            `For casual wear, choose ${formatProductNames(tshirts)} with ${formatProductNames(shoes)}.`,
            `For a smarter look, pick a plain black/white top, tuck it in, and add ${watches[0].name}.`,
        ].join('\n');
    }

    if (lowerMessage.includes('black jeans')) {
        return `Black jeans look best with a white, grey, or light pastel top. From your store, try ${tshirts[0].name} with ${shoes[0].name}; add ${watches[0].name} for a cleaner outfit.`;
    }

    if (lowerMessage.includes('top') || lowerMessage.includes('t-shirt') || lowerMessage.includes('shirt')) {
        return `For tops/T-shirts, pair ${formatProductNames(tshirts)} with ${formatProductNames(jeans)}. Use blue jeans for daily casual style, black jeans for a sharper evening look, and ${shoes[0].name} to finish it.`;
    }

    if (lowerMessage.includes('college') || lowerMessage.includes('casual')) {
        return `For a casual college outfit: ${tshirts[0].name}, ${jeans[0].name}, ${shoes[0].name}, and ${watches[0].name}. It is simple, comfortable, and easy to repeat.`;
    }

    if (lowerMessage.includes('party')) {
        return `For a party outfit, choose fitted jeans with a darker or graphic top. Try ${jeans[0].name} + ${tshirts[1]?.name || tshirts[0].name}, then add ${watches[0].name}. Keep shoes clean and simple.`;
    }

    if (lowerMessage.includes('kurti')) {
        return `For kurtis, try ${formatProductNames(kurtis)} with ${sandals[0].name}. Light kurtis go well with tan sandals; rich colors look better with simple gold-toned accessories.`;
    }

    if (lowerMessage.includes('saree')) {
        return `For sarees, pick ${sarees[0].name} and match the blouse with one color from the border. Add ${sandals[0].name} and keep accessories simple if the saree has heavy work.`;
    }

    if (lowerMessage.includes('watch') || lowerMessage.includes('accessor')) {
        return `For accessories, ${formatProductNames(accessories)} are easy picks. With jeans and a T-shirt, use ${watches[0].name}; with kurtis or sarees, choose one statement accessory and keep the rest light.`;
    }

    if (lowerMessage.includes('gift')) {
        return `For a gift, ${watches[0].name} is the safest choice. If they like fashion, pair it with ${tshirts[0].name} or ${accessories[0].name}.`;
    }

    return `Tell me the item or occasion, like "blue jeans", "college outfit", "party", "kurti", or "saree". I will suggest exact matching products from the store.`;
};

app.post('/api/auth/signup', async (request, response) => {
    const { name, email, password, role } = request.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const userRole = role === 'seller' ? 'seller' : 'buyer';

    if (!name || !normalizedEmail || !password || password.length < 6) {
        response.status(400).json({ message: 'Name, valid email, and 6 character password are required.' });
        return;
    }

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
        response.status(409).json({ message: 'This email is already registered.' });
        return;
    }

    const passwordData = hashPassword(password);
    const user = {
        uid: `user-${Date.now()}`,
        displayName: name.trim(),
        email: normalizedEmail,
        role: userRole,
        passwordHash: passwordData.hash,
        passwordSalt: passwordData.salt,
    };

    await addUser(user);
    await updateCart(user.uid, []);

    response.status(201).json({
        token: createToken(user),
        user: publicUser(user),
    });
});

app.post('/api/auth/login', async (request, response) => {
    const { email, password } = request.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
        response.status(401).json({ message: 'The email or password is incorrect.' });
        return;
    }

    const passwordData = hashPassword(password || '', user.passwordSalt);

    if (passwordData.hash !== user.passwordHash) {
        response.status(401).json({ message: 'The email or password is incorrect.' });
        return;
    }

    response.json({
        token: createToken(user),
        user: publicUser(user),
    });
});

app.get('/api/auth/me', requireAuth, async (request, response) => {
    const user = await findUserByUid(request.user.uid);

    if (!user) {
        response.status(404).json({ message: 'User not found.' });
        return;
    }

    response.json({ user: publicUser(user) });
});

app.get('/api/products', async (request, response) => {
    const products = await getProducts();
    response.json({ products });
});

app.post('/api/chat', requireAuth, async (request, response) => {
    const { message } = request.body;
    const userMessage = String(message || '').trim();

    if (!userMessage) {
        response.status(400).json({ message: 'Please provide a question or request for the assistant.' });
        return;
    }

    const products = await getProducts();
    response.json({ reply: buildLocalShoppingReply(userMessage, products) });
    return;

    const catalog = products
        .map((product) => `• ${product.name} — ₹${Number(product.price).toFixed(0)}`)
        .join('\n');

    const prompt = `You are a friendly shopping assistant for StyleHub. Recommend products and styling ideas based on the customer question, using the inventory below when possible. Always answer in a short but helpful way. Inventory:\n${catalog}\n\nCustomer question: ${userMessage}`;

    try {
        const geminiResponse = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: geminiModel,
                input: [
                    { role: 'system', content: 'You are StyleHub shopping assistant. Help customers browse and recommend products by name.' },
                    { role: 'user', content: prompt },
                ],
            }),
        });

        const chatData = await geminiResponse.json();

        if (!geminiResponse.ok) {
            response.json({ reply: buildLocalShoppingReply(userMessage, products) });
            return;
        }

        const reply = (chatData.output || [])
            .flatMap((item) => item?.content?.map((block) => block?.text || '').filter(Boolean) || [])
            .join('\n')
            .trim();

    response.json({ reply: reply || 'I’m sorry, I could not generate a recommendation at this time.' });
    } catch {
        response.json({ reply: buildLocalShoppingReply(userMessage, products) });
    }
});

app.post('/api/products', requireAuth, requireSeller, async (request, response) => {
    const { name, price, image } = request.body;

    if (!name || !Number(price) || !image) {
        response.status(400).json({ message: 'Product name, price, and image are required.' });
        return;
    }

    const product = {
        id: `custom-${Date.now()}`,
        name: String(name).trim(),
        price: Number(price),
        image,
        createdBy: request.user.uid,
    };

    await addProduct(product);
    response.status(201).json({ product });
});

app.delete('/api/products/:id', requireAuth, requireSeller, async (request, response) => {
    const { id } = request.params;
    const removed = await removeProduct(id);

    if (!removed) {
        response.status(404).json({ message: 'Product not found.' });
        return;
    }

    response.json({ success: true, id });
});

app.get('/api/cart', requireAuth, async (request, response) => {
    const cart = await getCart(request.user.uid);
    response.json({ cart });
});

app.put('/api/cart', requireAuth, async (request, response) => {
    const { cart } = request.body;

    if (!Array.isArray(cart)) {
        response.status(400).json({ message: 'Cart must be an array.' });
        return;
    }

    await updateCart(request.user.uid, cart);
    response.json({ cart });
});

const startServer = async () => {
    await connectMongo();

    app.listen(port, () => {
        console.log(`Backend API running on http://localhost:${port}`);

        if (!enableMongo) {
            console.warn('MongoDB is disabled via ENABLE_MONGO=false. Backend is using local file storage fallback.');
        } else if (!useMongo()) {
            console.warn('MongoDB is not enabled or not connected. Backend is using local file storage fallback.');
        }
    });
};

startServer().catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
});
