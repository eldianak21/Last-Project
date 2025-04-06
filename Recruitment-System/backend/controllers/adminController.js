// // backend/controllers/adminController.js
// const bcrypt = require('bcrypt');
// const db = require('../config/db');

// // Get all users
// const getAllUsers = async (req, res) => {
//     try {
//         const result = await db.query('SELECT UserID AS id, Username AS name, Email AS email, Role AS role, CreatedAt AS "lastActive" FROM Users');
//         res.json(result);
//     } catch (error) {
//         console.error('Error fetching users:', error.message); // More detail in logs
//         res.status(500).send({ message: 'Failed to fetch users.', error: error.message });
//     }
// };

// // Add HR User
// const addHRUser = async (req, res) => {
//     const { name, email, role } = req.body;

//     try {
//         console.log('Adding HR user:', { name, email, role });
//         const password = 'defaultpassword';
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log('Hashed password:', hashedPassword);
//         await db.query('INSERT INTO users (username, email, PasswordHash, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]); // Corrected column name
//         res.send({ message: 'HR user added successfully.' });
//     } catch (error) {
//         console.error('Error adding HR user:', error);
//         res.status(500).send({ message: 'Failed to add HR user. Error: ' + error.message });
//     }
// };

// // Remove User
// const removeUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await db.query('DELETE FROM users WHERE id = $1 AND role = $2', [id, 'HR Manager']);
//         res.send({ message: 'HR user removed successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Failed to remove HR user.' });
//     }
// };

// module.exports = {
//     getAllUsers,
//     addHRUser,
//     removeUser,
// };


// backend/controllers/adminController.js
// const bcrypt = require('bcrypt');
// const db = require('../config/db');


// // Get all users
// const getAllUsers = async (req, res) => {
//     try {
//         const result = await db.query('SELECT UserID AS id, Username AS name, Email AS email, Role AS role, CreatedAt AS "lastActive" FROM Users');
//         console.log('Query result:', result);
//         res.json(result[0] || []); // Corrected line
//     } catch (error) {
//         console.error('Error fetching users:', error.message);
//         res.status(500).json({ message: 'Failed to fetch users.', error: error.message });
//     }
// };
// // Add HR User
// const addHRUser = async (req, res) => {
//     const { name, email, role } = req.body;

//     try {
//         console.log('Adding HR user:', { name, email, role });
//         const password = 'defaultpassword';
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log('Hashed password:', hashedPassword);
//         await db.query('INSERT INTO users (username, email, PasswordHash, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]); // Corrected column name
//         res.send({ message: 'HR user added successfully.' });
//     } catch (error) {
//         console.error('Error adding HR user:', error);
//         res.status(500).send({ message: 'Failed to add HR user. Error: ' + error.message });
//     }
// };

// // Remove User
// const removeUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await db.query('DELETE FROM users WHERE id = $1 AND role = $2', [id, 'HR Manager']);
//         res.send({ message: 'HR user removed successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Failed to remove HR user.' });
//     }
// };

// module.exports = {
//     getAllUsers,
//     addHRUser,
//     removeUser,
// };


// const bcrypt = require('bcrypt');
// const db = require('../config/db');

// // Get all users
// const getAllUsers = async (req, res) => {
//     try {
//         const result = await db.query('SELECT UserID AS id, Username AS name, Email AS email, Role AS role, CreatedAt AS "lastActive" FROM Users');
//         console.log('Query result:', result);
//         res.json(result[0] || []);
//     } catch (error) {
//         console.error('Error fetching users:', error.message);
//         res.status(500).json({ message: 'Failed to fetch users.', error: error.message });
//     }
// };

// // Add HR User
// const addHRUser = async (req, res) => {
//     const { name, email, role } = req.body;

//     try {
//         console.log('Adding HR user:', { name, email, role });
//         const defaultPassword = 'defaultPassword'; // Set a default password
//         const hashedPassword = await bcrypt.hash(defaultPassword, 10);
//         console.log('Hashed password:', hashedPassword);
        
//         await db.query(
//             'INSERT INTO users (username, email, PasswordHash, role, requiresPasswordChange) VALUES (?, ?, ?, ?, ?)',
//             [name, email, hashedPassword, role, true] // Set requiresPasswordChange to true
//         );

//         res.send({ message: 'HR user added successfully.' });
//     } catch (error) {
//         console.error('Error adding HR user:', error);
//         res.status(500).send({ message: 'Failed to add HR user. Error: ' + error.message });
//     }
// };

// // Remove User
// const removeUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await db.query('DELETE FROM users WHERE id = ?', [id]); // Adjust as needed
//         res.send({ message: 'HR user removed successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Failed to remove HR user.' });
//     }
// };

// // Export functions
// module.exports = {
//     getAllUsers,
//     addHRUser,
//     removeUser,
// };


const bcrypt = require('bcrypt');
const db = require('../config/db');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT UserID AS id, Username AS name, Email AS email, Role AS role, CreatedAt AS "lastActive" FROM Users');
        console.log('Query result:', result);
        res.json(result[0] || []);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Failed to fetch users.', error: error.message });
    }
};

// Add HR User
// const addHRUser = async (req, res) => {
//     const { name, email, role } = req.body;

//     try {
//         console.log('Adding HR user:', { name, email, role });
//         const defaultPassword = 'DefaultPassword123'; // Set a default password
//         const hashedPassword = await bcrypt.hash(defaultPassword, 10);
//         console.log('Hashed password:', hashedPassword);

//         await db.query(
//             'INSERT INTO Users (Username, Email, PasswordHash, Role, requiresPasswordChange) VALUES (?, ?, ?, ?, ?)',
//             [name, email, hashedPassword, role, true] // Set requiresPasswordChange to true
//         );

//         res.send({ message: 'HR user added successfully.' });
//     } catch (error) {
//         console.error('Error adding HR user:', error);
//         res.status(500).send({ message: 'Failed to add HR user. Error: ' + error.message });
//     }
// };

// Example endpoint to add HR user
// const addHRUser = async (req, res) => {
//     const { name, email, role } = req.body;
//     const defaultPassword = 'DefaultPassword123'; // Set a default password
//     const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
//     try {
//         await db.query(
//             'INSERT INTO Users (Username, Email, PasswordHash, Role, requiresPasswordChange) VALUES (?, ?, ?, ?, ?)',
//             [name, email, hashedPassword, role, true] // Set requiresPasswordChange to true
//         );
//         res.send({ message: 'HR user added successfully.' });
//     } catch (error) {
//         console.error('Error adding HR user:', error);
//         res.status(500).send({ message: 'Failed to add HR user.' });
//     }
// };

const addHRUser = async (req, res) => {
    const { name, email, role } = req.body;
    const defaultPassword = 'DefaultPassword123'; // Set a default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    try {
        await db.query(
            'INSERT INTO Users (Username, Email, PasswordHash, Role, requiresPasswordChange) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, role, true] // Set requiresPasswordChange to true
        );
        res.send({ message: 'HR user added successfully.' });
    } catch (error) {
        console.error('Error adding HR user:', error);
        res.status(500).send({ message: 'Failed to add HR user.' });
    }
};


// Remove User
const removeUser = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM Users WHERE UserID = ?', [id]); // Adjust as needed
        res.send({ message: 'HR user removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to remove HR user.' });
    }
};

// Export functions
module.exports = {
    getAllUsers,
    addHRUser,
    removeUser,
};