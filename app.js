const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
// connectDB(); // Called in server.js to ensure connection before starting server

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const { errorHandler } = require('./middlewares/errorMiddleware');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/question-sets', require('./routes/questionSetRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/responses', require('./routes/responseRoutes'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
