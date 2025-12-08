const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const tournamentRoutes = require('./routes/tournamentRoutes');
const playerRoutes = require('./routes/playerRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors(
    {
        origin:'https://margam-steel.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true   
    }
));
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use(authRoutes);
app.use(tournamentRoutes);
app.use(playerRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Margam Esports API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
