const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable context-origin resource sharing
app.use(express.json({ limit: '10kb' })); // Body parser, limit data to 10kb
app.use(morgan('dev')); // Logger

// Routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: `Can't find ${req.originalUrl} on this server!` });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
