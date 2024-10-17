# VeryDeep Backend API

This is the backend API for the VeryDeep project, a full-featured e-commerce platform with user authentication, product management, and shopping cart functionality.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables in a `.env` file
4. Start the server: `npm start`

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST /register**: Register a new user
  - Body: `{ username, email, password, isAdmin }`
  - Returns: User object (excluding password)

- **POST /login**: Log in a user
  - Body: `{ email, password }`
  - Returns: JWT token

- **GET /profile**: Get user profile (requires authentication)
  - Returns: User object (excluding password)

- **PUT /profile**: Update user profile (requires authentication)
  - Body: `{ username, email }`
  - Returns: Updated user object (excluding password)

### Admin Routes (`/api/admin`) - Requires authentication and admin privileges

- **POST /products**: Create a new product
  - Body: `{ name, description, price, stock, category }`
  - Returns: Created product object

- **PUT /products/:id**: Update a product
  - Body: `{ name, description, price, stock, category }` (all fields optional)
  - Returns: Updated product object

- **DELETE /products/:id**: Delete a product
  - Returns: Success message

### Commerce Routes (`/api/commerce`)

- **GET /products**: Get all products
  - Returns: Array of product objects

- **GET /products/:id**: Get a specific product
  - Returns: Product object

- **GET /products/category/:category**: Get products by category
  - Returns: Array of product objects

- **GET /cart**: Get user's cart (requires authentication)
  - Returns: Cart object with populated product details

- **POST /cart/add**: Add item to cart (requires authentication)
  - Body: `{ productId, quantity }`
  - Returns: Updated cart object

- **PUT /cart/update**: Update cart item quantity (requires authentication)
  - Body: `{ productId, quantity }`
  - Returns: Updated cart object

- **DELETE /cart/remove**: Remove item from cart (requires authentication)
  - Body: `{ productId }`
  - Returns: Updated cart object

- **DELETE /cart/clear**: Clear cart (requires authentication)
  - Returns: Success message

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
