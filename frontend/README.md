# Ecommerce With React

A responsive React ecommerce starter focused on authentication pages and a cart products experience. The project currently includes polished login/signup screens, cart product quantity controls, cart totals, and route handling with React Router.

## Features

- Responsive login and signup pages
- Client-side form validation with toast messages
- Cart products page with sample products
- Increase, decrease, and remove cart item actions
- Automatic cart quantity and price totals
- React Router routes for auth and cart pages
- Bootstrap and custom CSS styling

## Tech Stack

- React 18
- React Router DOM
- React Toastify
- Bootstrap 5
- Create React App

## Project Structure

```text
src/
  Components/
    CartProducts.js
    Login.js
    Signup.js
  App.js
  index.css
  index.js
public/
  index.html
  logobg.png
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Redirects to `/login` |
| `/login` | Login page |
| `/signup` | Signup page |
| `/singnup` | Redirects to `/signup` |
| `/home` | Ecommerce main page |
| `/addproducts` | Add product page |
| `/add-products` | Add product page |
| `/cashout` | Checkout page |
| `/checkout` | Checkout page |
| `/cart` | Cart products page |
| `/cart-products` | Cart products page |
| `/cartproducts` | Cart products page |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

The app will run at:

```text
http://localhost:3000
```

### 3. Create a production build

```bash
npm run build
```

The optimized output will be created inside the `build/` folder.

## Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm test
```

Runs the test watcher.

```bash
npm run eject
```

Ejects the Create React App configuration. Use only when you need full control over the build setup.

## Current Notes

- Cart products currently use local sample data inside `CartProducts.js`.
- Login and signup validation is client-side only.
- Firebase dependencies are installed, but authentication/database integration is not wired into the current pages yet.
- Some older ecommerce components are present in the repository and may need cleanup or completion before being used in routes.

## Future Improvements

- Connect login and signup to Firebase Authentication
- Load products from Firebase or an API
- Persist cart items across page refreshes
- Add checkout form validation and order storage
- Add protected routes for cart and checkout pages
