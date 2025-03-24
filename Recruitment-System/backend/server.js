const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Ensure this is your database connection
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use your authentication routes
app.use('/api/auth', authRoutes);

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});