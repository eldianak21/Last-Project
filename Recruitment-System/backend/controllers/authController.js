const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup function
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const query = `INSERT INTO Users (Username, PasswordHash, Role, Email) VALUES (?, ?, 'Applicant', ?)`;
    db.query(query, [username, passwordHash, email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
};

// User login function
const login = async (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM Users WHERE Username = ?`;
    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { signup, login };