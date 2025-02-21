# userAuthapi

## Overview

userAuthapi is a Node.js-based authentication API that provides secure user authentication functionalities. It includes user sign-up, email verification, login, logout, and password recovery.

## Features

- User sign-up with email verification
- Secure password hashing
- JWT authentication
- User login and logout
- Password reset functionality
- Middleware for protected routes

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Mailtrap (for email verification)

## Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd userAuthapi
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=4000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   MAILTRAP_USER=<your-mailtrap-username>
   MAILTRAP_PASS=<your-mailtrap-password>
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### **1. User Registration**

**Endpoint:** `POST /api/auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User registered successfully. Please check your email for verification."
}
```

### **2. Email Verification**

**Endpoint:** `GET /api/auth/verify/:token`

**Response:**

```json
{
  "message": "Email verified successfully."
}
```

### **3. User Login**

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```

### **4. Password Reset (Request)**

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "Password reset link sent to email."
}
```

### **5. Password Reset (Update)**

**Endpoint:** `POST /api/auth/reset-password/:token`

**Request Body:**

```json
{
  "newPassword": "newSecurePassword"
}
```

**Response:**

```json
{
  "message": "Password has been updated successfully."
}
```

### **6. User Logout**

**Endpoint:** `POST /api/auth/logout`

**Response:**

```json
{
  "message": "User logged out successfully."
}
```

## Security Measures

- **Password Hashing:** Uses bcrypt to securely hash passwords before storing them.
- **JWT Authentication:** Ensures secure user sessions.
- **Email Verification:** Prevents fake accounts by requiring email confirmation.

## Deployment

You can deploy this API using services like **Render**, **Heroku**, or **Vercel**.

## Contributing

Feel free to submit issues or pull requests to improve this project.

## License

This project is licensed under the MIT License.
