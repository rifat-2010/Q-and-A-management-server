# Q&A Management System - Backend API

A professional Node.js/Express backend application for managing dynamic questions and responses. This system provides comprehensive APIs for user authentication, question set management, question creation, and response collection with role-based access control.

**Live API:** https://q-and-a-management.vercel.app/

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Project Overview

The Q&A Management System is a full-stack application designed to:

- Allow **Admins** to create and manage question sets and questions
- Allow **Users** to submit responses to question sets
- Provide secure authentication using JWT tokens
- Store and retrieve structured data in MongoDB
- Support multiple question types (MCQ, Boolean, Descriptive)

### Key Features:

✅ User Authentication (Register/Login)  
✅ Role-Based Access Control (Admin/User)  
✅ Question Set Management  
✅ Question Management with Multiple Types  
✅ Response Collection & Tracking  
✅ JWT Token-Based Security  
✅ Password Hashing with Bcrypt  
✅ Comprehensive Error Handling  
✅ Deployed on Vercel

---

## 🛠️ Tech Stack

| Technology     | Version | Purpose                 |
| -------------- | ------- | ----------------------- |
| **Node.js**    | Latest  | Runtime environment     |
| **Express.js** | 5.2.1   | Web framework           |
| **MongoDB**    | Latest  | NoSQL database          |
| **Mongoose**   | 9.1.5   | MongoDB ODM             |
| **JWT**        | 9.0.3   | Authentication          |
| **Bcryptjs**   | 3.0.3   | Password hashing        |
| **CORS**       | 2.8.6   | Cross-origin requests   |
| **Dotenv**     | 17.2.3  | Environment variables   |
| **Nodemon**    | Dev     | Development auto-reload |

---

## 📁 Project Structure

```
Q-and-A-management-server/
├── app.js                    # Express app configuration
├── server.js                 # Entry point & server startup
├── package.json              # Project dependencies
├── vercel.json               # Vercel deployment config
├── .gitignore                # Git ignore rules
├── .env.example              # Environment variables template
│
├── config/
│   └── db.js                 # MongoDB connection setup
│
├── models/                   # Database schemas
│   ├── User.js               # User model (name, email, password, role)
│   ├── QuestionSet.js        # QuestionSet model (title, description, createdBy)
│   ├── Question.js           # Question model (type, text, options, answer)
│   └── Response.js           # Response model (userId, answers, submittedAt)
│
├── controllers/              # Business logic
│   ├── authController.js     # Registration & Login
│   ├── questionSetController.js    # CRUD for question sets
│   ├── questionController.js       # CRUD for questions
│   └── responseController.js       # Response creation & retrieval
│
├── routes/                   # API endpoints
│   ├── authRoutes.js         # Authentication endpoints
│   ├── questionSetRoutes.js  # QuestionSet endpoints
│   ├── questionRoutes.js     # Question endpoints
│   └── responseRoutes.js     # Response endpoints
│
└── middlewares/              # Custom middleware
    ├── authMiddleware.js     # JWT verification
    ├── adminMiddleware.js    # Admin role check
    └── errorMiddleware.js    # Global error handler
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/rifat-2010/Q-and-A-management-server.git
cd Q-and-A-management-server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

Create a `.env` file in the root directory (use `.env.example` as reference):

```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit `.env` and add your credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Step 5: Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`

---

## 🔐 Environment Variables

| Variable     | Type   | Description                | Example                      |
| ------------ | ------ | -------------------------- | ---------------------------- |
| `PORT`       | Number | Server port                | `5000`                       |
| `MONGO_URI`  | String | MongoDB connection string  | `mongodb+srv://...`          |
| `JWT_SECRET` | String | Secret key for JWT signing | `dev_secret_key_...`         |
| `NODE_ENV`   | String | Environment mode           | `development` / `production` |

**Security Note:** Never commit `.env` file to git. Use `.env.example` as template for other developers.

---

## 📡 API Documentation

### Base URL

```
https://q-and-a-management.vercel.app/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // optional: "admin" or "user" (default: "user")
}

Response (201):
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "jwt_token_here"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "jwt_token_here"
}
```

---

### Question Set Endpoints

#### Get All Question Sets

```http
GET /api/question-sets
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "setId",
    "title": "General Knowledge",
    "description": "Basic knowledge questions",
    "createdBy": { "_id": "userId", "name": "Admin" },
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Question Set by ID

```http
GET /api/question-sets/:id
Authorization: Bearer {token}

Response (200):
{
  "_id": "setId",
  "title": "General Knowledge",
  "description": "Basic knowledge questions",
  "createdBy": { "_id": "userId", "name": "Admin" },
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Create Question Set (Admin Only)

```http
POST /api/question-sets
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Science Quiz",
  "description": "Physics and Chemistry questions"
}

Response (201):
{
  "_id": "newSetId",
  "title": "Science Quiz",
  "description": "Physics and Chemistry questions",
  "createdBy": "adminUserId",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Update Question Set (Admin Only)

```http
PUT /api/question-sets/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description"
}

Response (200): Updated question set object
```

#### Delete Question Set (Admin Only)

```http
DELETE /api/question-sets/:id
Authorization: Bearer {admin_token}

Response (200):
{ "id": "setId" }
```

---

### Question Endpoints

#### Add Question to Set (Admin Only)

```http
POST /api/questions
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "questionSetId": "setId",
  "type": "mcq",  // mcq | boolean | descriptive
  "questionText": "What is the capital of France?",
  "options": ["Paris", "London", "Berlin", "Madrid"],
  "correctAnswer": "Paris",
  "required": true
}

Response (201):
{
  "_id": "questionId",
  "questionSetId": "setId",
  "type": "mcq",
  "questionText": "What is the capital of France?",
  "options": ["Paris", "London", "Berlin", "Madrid"],
  "correctAnswer": "Paris",
  "required": true
}
```

#### Get Questions by Set ID

```http
GET /api/questions/set/:setId
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "questionId",
    "questionSetId": "setId",
    "type": "mcq",
    "questionText": "What is the capital of France?",
    ...
  }
]
```

#### Update Question (Admin Only)

```http
PUT /api/questions/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "questionText": "Updated question text",
  "correctAnswer": "Updated answer"
}

Response (200): Updated question object
```

#### Delete Question (Admin Only)

```http
DELETE /api/questions/:id
Authorization: Bearer {admin_token}

Response (200):
{ "id": "questionId" }
```

---

### Response Endpoints

#### Submit Response (User)

```http
POST /api/responses
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "questionSetId": "setId",
  "answers": [
    {
      "questionId": "questionId1",
      "answer": "Paris"
    },
    {
      "questionId": "questionId2",
      "answer": "true"
    }
  ]
}

Response (201):
{
  "_id": "responseId",
  "userId": "userId",
  "questionSetId": "setId",
  "answers": [...],
  "submittedAt": "2024-01-15T11:45:00Z"
}
```

#### Get All Responses (Admin Only)

```http
GET /api/responses
Authorization: Bearer {admin_token}

Response (200):
[
  {
    "_id": "responseId",
    "userId": { "_id": "userId", "name": "John Doe", "email": "john@example.com" },
    "questionSetId": { "_id": "setId", "title": "Quiz Title" },
    "answers": [...],
    "submittedAt": "2024-01-15T11:45:00Z"
  }
]
```

#### Get Response by ID (Admin Only)

```http
GET /api/responses/:id
Authorization: Bearer {admin_token}

Response (200):
{
  "_id": "responseId",
  "userId": { "_id": "userId", "name": "John Doe", "email": "john@example.com" },
  "questionSetId": { "_id": "setId", "title": "Quiz Title" },
  "answers": [
    {
      "questionId": {
        "_id": "questionId",
        "questionText": "What is the capital of France?",
        "type": "mcq",
        "options": [...],
        "correctAnswer": "Paris"
      },
      "answer": "Paris"
    }
  ],
  "submittedAt": "2024-01-15T11:45:00Z"
}
```

---

## 💾 Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'user'], default: 'user'),
  createdAt: Date (default: now)
}
```

### QuestionSet Model

```javascript
{
  title: String (required),
  description: String,
  createdBy: ObjectId (ref: User, required),
  createdAt: Date (default: now)
}
```

### Question Model

```javascript
{
  questionSetId: ObjectId (ref: QuestionSet, required),
  type: String (enum: ['mcq', 'boolean', 'descriptive'], required),
  questionText: String (required),
  options: [String],
  correctAnswer: String,
  required: Boolean (default: false)
}
```

### Response Model

```javascript
{
  userId: ObjectId (ref: User, required),
  questionSetId: ObjectId (ref: QuestionSet, required),
  answers: [
    {
      questionId: ObjectId (ref: Question),
      answer: String
    }
  ],
  submittedAt: Date (default: now)
}
```

---

## 🔧 Middleware

### Authentication Middleware (`authMiddleware.js`)

- **Purpose:** Verify JWT tokens and attach user info to requests
- **Usage:** Applied to protected routes
- **Function:** Extracts and validates Bearer token from Authorization header
- **Returns:** User object attached to `req.user`
- **Errors:** 401 Unauthorized if token missing or invalid

```javascript
const { protect } = require("../middlewares/authMiddleware");
router.get("/protected-route", protect, controller);
```

### Admin Middleware (`adminMiddleware.js`)

- **Purpose:** Verify user has admin role
- **Usage:** Applied after authMiddleware on admin routes
- **Function:** Checks if `req.user.role === 'admin'`
- **Returns:** Passes request to next middleware/controller
- **Errors:** 401 Unauthorized if user is not admin

```javascript
const { admin } = require("../middlewares/adminMiddleware");
router.post("/admin-route", protect, admin, controller);
```

### Error Middleware (`errorMiddleware.js`)

- **Purpose:** Global error handling for all routes
- **Usage:** Applied last in middleware chain
- **Function:** Catches all errors and formats response
- **Features:** Hides stack trace in production mode
- **Returns:** JSON error response with message and optional stack

```javascript
const { errorHandler } = require("../middlewares/errorMiddleware");
app.use(errorHandler);
```

---

## ⚠️ Error Handling

The application implements comprehensive error handling:

### Error Response Format

```json
{
  "message": "Error description",
  "stack": null // Only shown in development
}
```

### Common Error Codes

| Status | Error        | Scenario                                          |
| ------ | ------------ | ------------------------------------------------- |
| `400`  | Bad Request  | Missing/invalid fields                            |
| `401`  | Unauthorized | Invalid/missing token or insufficient permissions |
| `404`  | Not Found    | Resource doesn't exist                            |
| `500`  | Server Error | Unexpected server error                           |

### Error Handling Flow

1. Error occurs in controller
2. Error is passed to `next(error)`
3. errorMiddleware catches and formats error
4. Response sent with appropriate HTTP status code

---

## 📦 File-by-File Breakdown

### Core Files

#### `app.js`

- **Purpose:** Express application setup and configuration
- **Contains:**
  - Express middleware initialization (JSON parser, CORS)
  - Route registration for all API endpoints
  - Global error handler middleware
  - Default test route (`GET /`)
- **Exports:** Configured Express app instance

#### `server.js`

- **Purpose:** Server startup and entry point
- **Contains:**
  - Environment variable loading (dotenv)
  - MongoDB connection initialization
  - Server listener setup (port configuration)
  - Vercel export for serverless deployment
- **Exports:** App instance for Vercel

#### `package.json`

- **Purpose:** Project metadata and dependency management
- **Scripts:**
  - `dev`: Development mode with nodemon
  - `start`: Production mode
  - `test`: Placeholder for testing
- **Dependencies:** All required npm packages with versions

---

### Controllers

#### `authController.js`

- **Functions:**
  - `registerUser(req, res, next)`: Create new user account
    - Validates required fields
    - Checks if user already exists
    - Hashes password with bcrypt
    - Creates user in database
    - Returns user info + JWT token
  - `loginUser(req, res, next)`: Authenticate user
    - Finds user by email
    - Compares password with bcrypt
    - Returns user info + JWT token on success

- **Tokens:** Generated with 30-day expiration

#### `questionSetController.js`

- **Functions:**
  - `createQuestionSet(req, res, next)`: Create new question set (Admin)
    - Validates title is provided
    - Associates with authenticated admin user
    - Stores in database
  - `getQuestionSets(req, res, next)`: Fetch all question sets
    - Populates creator user info
    - Returns array of question sets
  - `getQuestionSetById(req, res, next)`: Fetch single question set
    - Returns specific question set with creator info
  - `updateQuestionSet(req, res, next)`: Update question set (Admin)
    - Verifies admin role
    - Updates title/description
  - `deleteQuestionSet(req, res, next)`: Delete question set (Admin)
    - Removes question set from database

#### `questionController.js`

- **Functions:**
  - `addQuestion(req, res, next)`: Add question to set (Admin)
    - Validates required fields
    - Supports multiple question types
    - Associates with question set
  - `getQuestionsBySetId(req, res, next)`: Get all questions in a set
    - Returns questions filtered by set ID
  - `updateQuestion(req, res, next)`: Update question (Admin)
    - Updates question text, options, answer
  - `deleteQuestion(req, res, next)`: Delete question (Admin)
    - Removes question from database

#### `responseController.js`

- **Functions:**
  - `createResponse(req, res, next)`: Submit quiz response (User)
    - Validates question set ID and answers
    - Stores response with timestamp
    - Associates with authenticated user
  - `getResponses(req, res, next)`: Get all responses (Admin)
    - Populates user and question set details
  - `getResponseById(req, res, next)`: Get specific response (Admin)
    - Includes detailed question information
    - Allows admin to review answers

---

### Models

#### `User.js`

- **Schema:** Defines user document structure
- **Fields:** name, email, password, role, createdAt
- **Validation:** Email uniqueness enforced at DB level
- **Collection:** 'users'

#### `QuestionSet.js`

- **Schema:** Defines question set structure
- **Fields:** title, description, createdBy (ref), createdAt
- **Relations:** References User model
- **Collection:** 'questionSets'

#### `Question.js`

- **Schema:** Defines question structure
- **Fields:** questionSetId, type, questionText, options, correctAnswer, required
- **Types:** MCQ, Boolean, Descriptive
- **Relations:** References QuestionSet model
- **Collection:** 'questions'

#### `Response.js`

- **Schema:** Defines response structure
- **Fields:** userId, questionSetId, answers (array), submittedAt
- **Answer Format:** `[{ questionId, answer }]`
- **Relations:** References User and QuestionSet models
- **Collection:** 'responses'

---

### Routes

#### `authRoutes.js`

- `POST /api/auth/register` → registerUser
- `POST /api/auth/login` → loginUser

#### `questionSetRoutes.js`

- `GET /api/question-sets` → getQuestionSets (protected)
- `POST /api/question-sets` → createQuestionSet (protected, admin)
- `GET /api/question-sets/:id` → getQuestionSetById (protected)
- `PUT /api/question-sets/:id` → updateQuestionSet (protected, admin)
- `DELETE /api/question-sets/:id` → deleteQuestionSet (protected, admin)

#### `questionRoutes.js`

- `POST /api/questions` → addQuestion (protected, admin)
- `GET /api/questions/set/:setId` → getQuestionsBySetId (protected)
- `PUT /api/questions/:id` → updateQuestion (protected, admin)
- `DELETE /api/questions/:id` → deleteQuestion (protected, admin)

#### `responseRoutes.js`

- `POST /api/responses` → createResponse (protected)
- `GET /api/responses` → getResponses (protected, admin)
- `GET /api/responses/:id` → getResponseById (protected, admin)

---

### Configuration

#### `config/db.js`

- **Purpose:** MongoDB connection setup
- **Function:** `connectDB()`
  - Uses Mongoose to connect to MongoDB
  - Logs connection host on success
  - Exits process on connection failure
- **Environment:** Uses `MONGO_URI` from .env

---

### Middleware

#### `authMiddleware.js`

- **Function:** `protect(req, res, next)`
  - Extracts JWT from Authorization header
  - Verifies token using JWT_SECRET
  - Attaches decoded user to `req.user`
  - Blocks requests without valid token

#### `adminMiddleware.js`

- **Function:** `admin(req, res, next)`
  - Checks if `req.user.role === 'admin'`
  - Allows only admin users to proceed
  - Returns 401 for non-admin users

#### `errorMiddleware.js`

- **Function:** `errorHandler(err, req, res, next)`
  - Catches all application errors
  - Sends structured error response
  - Hides stack trace in production

---

## 🌐 Deployment

### Vercel Deployment

The project is configured for serverless deployment on Vercel.

#### Configuration Files

- **`vercel.json`:** Deployment configuration
  - Builds from `server.js`
  - Routes all requests to server.js
  - Runs on Node.js runtime

#### Deployment Steps

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy automatically on push to main branch

#### Live API

```
https://q-and-a-management.vercel.app/
```

#### Environment Variables on Vercel

Must be set in Vercel project settings:

```
MONGO_URI = mongodb+srv://...
JWT_SECRET = your_secret_key
NODE_ENV = production
```

---

## 🔒 Security Practices

✅ **Password Hashing:** All passwords hashed with bcryptjs (10 salt rounds)  
✅ **JWT Authentication:** Secure token-based authentication  
✅ **Environment Variables:** Sensitive data stored in .env (not in git)  
✅ **Role-Based Access:** Admin middleware restricts sensitive operations  
✅ **Error Handling:** Stack traces hidden in production  
✅ **CORS:** Configured for cross-origin requests  
✅ **Input Validation:** Required fields validated before DB operations

---

## 📝 NPM Scripts

```bash
npm install      # Install all dependencies
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm test         # Run tests (placeholder)
```

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**

- Check `MONGO_URI` in .env is correct
- Verify IP whitelist on MongoDB Atlas
- Ensure cluster status is active

**JWT Token Invalid**

- Verify `JWT_SECRET` matches between generation and verification
- Check token hasn't expired
- Ensure proper `Bearer` prefix in Authorization header

**Admin Routes Return 401**

- Verify user role is set to 'admin' in database
- Confirm auth token is valid
- Check admin middleware is applied correctly

**CORS Errors**

- CORS is enabled for all origins (production: restrict as needed)
- Check browser Developer Tools for specific error

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📄 License

ISC License - Feel free to use this project

---

## 👤 Author

**Developed by:** Rifat-2010

---

## 📞 Support

For issues or questions:

- Create an issue on GitHub
- Check existing documentation
- Review error messages for debugging hints

---

**Last Updated:** February 4, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
