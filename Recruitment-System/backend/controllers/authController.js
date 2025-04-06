// const db = require('../config/db'); // Your database connection
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { body, validationResult } = require('express-validator');

// // User signup function
// const signup = async (req, res) => {
//     await body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters').run(req);
//     await body('email').isEmail().withMessage('Invalid email').run(req);
//     await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, email, password } = req.body;

//     try {
//         const existingUserQuery = `SELECT * FROM Users WHERE Email = ? OR Username = ?`;
//         const [existingUser] = await db.query(existingUserQuery, [email, username]);

//         if (existingUser.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const passwordHash = await bcrypt.hash(password, 10);
//         const query = `INSERT INTO Users (Username, PasswordHash, Role, Email) VALUES (?, ?, 'Applicant', ?)`;
//         await db.query(query, [username, passwordHash, email]);

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // User login function
// const login = async (req, res) => {
//     await body('username').notEmpty().withMessage('Username is required').run(req);
//     await body('password').notEmpty().withMessage('Password is required').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//         const query = `SELECT * FROM Users WHERE Username = ?`;
//         const [results] = await db.query(query, [username]);

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.PasswordHash);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = { signup, login };

// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db'); // Adjust the path as necessary
// const { signup, login } = require('../controllers/authController'); // Keep existing imports
// const router = express.Router();

// // Public routes
// router.post('/signup', signup);
// router.post('/login', login);

// // Change Password route
// router.post('/change-password', async (req, res) => {
//     const { username, newPassword } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         await db.query(
//             'UPDATE Users SET PasswordHash = ?, requiresPasswordChange = ? WHERE Username = ?',
//             [hashedPassword, false, username]
//         );

//         res.status(200).send({ message: 'Password changed successfully!' });
//     } catch (error) {
//         console.error('Error changing password:', error);
//         res.status(500).send({ message: 'Failed to change password.' });
//     }
// });

// module.exports = router;

const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// User signup function
// const signup = async (req, res) => {
//     await body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters').run(req);
//     await body('email').isEmail().withMessage('Invalid email').run(req);
//     await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, email, password } = req.body;

//     try {
//         const existingUserQuery = `SELECT * FROM Users WHERE Email = ? OR Username = ?`;
//         const [existingUser] = await db.query(existingUserQuery, [email, username]);

//         if (existingUser.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const passwordHash = await bcrypt.hash(password, 10);
//         const query = `INSERT INTO Users (Username, PasswordHash, Role, Email, requiresPasswordChange) VALUES (?, ?, 'Applicant', ?, true)`;
//         await db.query(query, [username, passwordHash, email]);

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const signup = async (req, res) => {
    // Validate input fields
    await body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters').run(req);
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const existingUserQuery = `SELECT * FROM Users WHERE Email = ? OR Username = ?`;
        const [existingUser] = await db.query(existingUserQuery, [email, username]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const query = `INSERT INTO Users (Username, PasswordHash, Role, Email, requiresPasswordChange) VALUES (?, ?, 'Applicant', ?, true)`;
        await db.query(query, [username, passwordHash, email]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User login function
// const login = async (req, res) => {
//     await body('username').notEmpty().withMessage('Username is required').run(req);
//     await body('password').notEmpty().withMessage('Password is required').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//         const query = `SELECT * FROM Users WHERE Username = ?`;
//         const [results] = await db.query(query, [username]);

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.PasswordHash);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, requiresChange: user.requiresPasswordChange }); // Include password change requirement
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const login = async (req, res) => {
//     // Validate input fields
//     await body('username').notEmpty().withMessage('Username is required').run(req);
//     await body('password').notEmpty().withMessage('Password is required').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//         const query = `SELECT * FROM Users WHERE Username = ?`;
//         const [results] = await db.query(query, [username]);

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.PasswordHash);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, requiresChange: user.requiresPasswordChange }); // Include password change requirement
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const login = async (req, res) => {
//     await body('username').notEmpty().withMessage('Username is required').run(req);
//     await body('password').notEmpty().withMessage('Password is required').run(req);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//         const query = `SELECT * FROM Users WHERE Username = ?`;
//         const [results] = await db.query(query, [username]);

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.PasswordHash);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, requiresChange: user.requiresPasswordChange });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const login = async (req, res) => {
    // Validate input fields
    await body('username').notEmpty().withMessage('Username is required').run(req);
    await body('password').notEmpty().withMessage('Password is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const query = `SELECT * FROM Users WHERE Username = ?`;
        const [results] = await db.query(query, [username]);

        console.log('Query Results:', results); // Log the query results

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        console.log('Stored Hash:', user.PasswordHash); // Log the stored hash

        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        console.log('Password Match:', isMatch); // Log the result of the password comparison

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, requiresChange: user.requiresPasswordChange });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// module.exports = { signup, login };

module.exports = { signup, login };