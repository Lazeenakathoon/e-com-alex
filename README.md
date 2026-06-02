# mern-ecommerce-app
An advanced full-stack MERN e-commerce platform integrated with an AI chatbot assistant to provide a smart and personalized shopping experience. The application allows users to browse products, manage carts, place orders, and interact with an AI-powered chatbot for product recommendations, customer support, and shopping guidance in real time.

## Deployment env

Deploy the backend and frontend separately, then connect them with environment variables.

Backend env:
- `PORT`: the port provided by the host, usually set automatically.
- `NODE_ENV=production`
- `JWT_SECRET`: a long random secret.
- `ENABLE_MONGO=true`
- `MONGO_URI`: your MongoDB Atlas connection string.
- `MONGO_DB_NAME=stylehub`
- `CLIENT_ORIGIN`: your deployed frontend URL, for example `https://stylehub.vercel.app`. Use commas for multiple origins.

Frontend env:
- `REACT_APP_API_URL`: your deployed backend API URL ending with `/api`, for example `https://stylehub-api.onrender.com/api`.

After deploying the backend, open `https://your-backend-domain.com/api/health`. It should return JSON with `"ok": true`.
