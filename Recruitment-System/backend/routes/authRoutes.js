// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const router = express.Router();

// // Public routes
// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;

// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const router = express.Router();

// // Public routes
// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Adjust the path as necessary
const { signup, login } = require('../controllers/authController'); // Keep existing imports
const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Change Password route
router.post('/change-password', async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE Users SET PasswordHash = ?, requiresPasswordChange = ? WHERE Username = ?', 
                       [hashedPassword, false, username]);

        res.status(200).send({ message: 'Password changed successfully!' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).send({ message: 'Failed to change password.' });
    }
});

module.exports = router;