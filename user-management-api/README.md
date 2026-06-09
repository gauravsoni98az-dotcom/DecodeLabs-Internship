# Project 2 - User Management API 🔐

A secure and fully functional **REST API** for user management built as part of the **DecodeLabs Full Stack Development Internship Program (Batch 2026)**.

## 📌 About the Project

This project is a backend REST API built with Node.js and Express that handles user registration, login, and profile management with secure JWT-based authentication and bcrypt password hashing.

## 🚀 Features

- User Registration with input validation
- User Login with JWT token generation
- Protected routes using JWT authentication
- Password hashing with bcrypt
- Get all users (protected route)
- Get single user by ID (protected route)
- Proper error handling and response messages
- Health check endpoint

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| JWT (JSON Web Token) | Authentication |
| bcrypt | Password hashing |
| Express Validator | Input validation |

## 📁 Project Structure

```
user-management-api/
├── src/
│   ├── routes/
│   │   ├── authRoutes.js     # Register & Login routes
│   │   └── userRoutes.js     # User CRUD routes
│   └── db.js                 # Database configuration
├── index.js                  # Entry point
├── package.json
└── .gitignore
```

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Health check | ❌ |
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/users` | Get all users | ✅ |
| GET | `/api/users/:id` | Get user by ID | ✅ |

## ⚙️ How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/gauravsoni98az-dotcom/DecodeLabs-Internship.git
```

2. Go to project folder
```bash
cd DecodeLabs-Internship/user-management-api
```

3. Install dependencies
```bash
npm install
```

4. Start the server
```bash
node index.js
```

5. Server runs on `http://localhost:3000`

## 🏢 Internship Details

- **Organization:** DecodeLabs
- **Program:** Full Stack Development Internship
- **Project:** 2 of the internship series

---

*Built with ❤️ by Gaurav Soni*
