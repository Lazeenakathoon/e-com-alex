# StyleHub MERN Ecommerce App

StyleHub is a full-stack MERN ecommerce application with product browsing, buyer and seller accounts, cart management, and a shopping assistant that suggests products and outfit ideas from the store catalog.

## Features

- React storefront with category pages for jeans, T-shirts, shoes, watches, kurtis, sandals, sarees, and accessories.
- Buyer signup/login, authenticated cart storage, and checkout flow.
- Seller role support for adding and removing products.
- Express API with JWT authentication and protected buyer/seller routes.
- MongoDB Atlas support with a local file-storage fallback for development.
- Floating shopping assistant for styling and product recommendations.

## Tech Stack

- Frontend: React 18, React Router, Bootstrap, styled-components, Framer Motion.
- Backend: Node.js, Express, MongoDB driver, JWT-style auth helpers.
- Storage: MongoDB when enabled, local data fallback when MongoDB is disabled or unavailable.

## Project Structure

```text
.
+-- backend/        # Express API, auth, storage, seed data, environment config
+-- frontend/       # React app, routes, components, images, API client config
`-- README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas connection string, optional for local development

## Local Setup

Install dependencies for both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create environment files from the examples:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

For local development, you can run without MongoDB by setting `ENABLE_MONGO=false` in `backend/.env`. The backend will use local file storage fallback.

## Environment Variables

Backend variables in `backend/.env`:

| Variable | Description |
| --- | --- |
| `PORT` | API port. Defaults to `5000`. |
| `NODE_ENV` | Use `development` locally and `production` in deployment. |
| `JWT_SECRET` | Long random secret used for auth tokens. |
| `ENABLE_MONGO` | Set to `true` to use MongoDB, or `false` for local fallback storage. |
| `MONGO_URI` | MongoDB Atlas connection string. Required when `ENABLE_MONGO=true`. |
| `MONGO_DB_NAME` | Database name. Defaults to `stylehub`. |
| `CLIENT_ORIGIN` | Allowed frontend origin, such as `http://localhost:3000`. Use commas for multiple origins. |

Frontend variables in `frontend/.env`:

| Variable | Description |
| --- | --- |
| `REACT_APP_API_URL` | Backend API base URL ending with `/api`, such as `http://localhost:5000/api`. |

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm start
```

Open the app at `http://localhost:3000`. The API health endpoint should respond at `http://localhost:5000/api/health`.

## Available Scripts

Backend scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Express API with nodemon. |
| `npm start` | Start the Express API with Node. |

Frontend scripts:

| Command | Description |
| --- | --- |
| `npm start` | Start the React development server. |
| `npm run build` | Build the production React app. |
| `npm test` | Run React tests. |

## Deployment

Deploy the backend and frontend separately, then connect them with environment variables.

Backend deployment values:

- `PORT`: usually set automatically by the host.
- `NODE_ENV=production`
- `JWT_SECRET`: a long random secret.
- `ENABLE_MONGO=true`
- `MONGO_URI`: your MongoDB Atlas connection string.
- `MONGO_DB_NAME=stylehub`
- `CLIENT_ORIGIN`: your deployed frontend URL, for example `https://stylehub.vercel.app`. Use commas for multiple origins.

Frontend deployment values:

- In the Vercel project settings, add `REACT_APP_API_URL` with your deployed backend API URL, for example `https://stylehub-api.onrender.com/api`. This frontend uses Create React App, so the variable is included at build time; redeploy after adding or changing it.
- In the backend hosting settings, set `CLIENT_ORIGIN` to the exact deployed Vercel site origin (scheme and hostname, with no path). For multiple allowed frontend origins, separate them with commas.

After deploying the backend, open:

```text
https://your-backend-domain.com/api/health
```

It should return JSON with `"ok": true`.
