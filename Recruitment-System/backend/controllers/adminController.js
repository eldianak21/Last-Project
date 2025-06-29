const bcrypt = require("bcrypt");
const db = require("../config/db");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT UserID AS id, Username AS name, Email AS email, Role AS role, FirstName AS firstName, LastName AS lastName, CreatedAt AS "lastActive" FROM Users'
    );
    console.log("Query result:", result);
    res.json(result[0] || []);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch users.", error: error.message });
  }
};

const addHRUser = async (req, res) => {
  const { firstName, lastName, email, role } = req.body; // Correctly extract fields
  const defaultPassword = "DefaultPassword123"; // Set a default password
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Generate a username (you might want a more sophisticated logic)
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

  try {
    await db.query(
      "INSERT INTO Users (Username, Email, PasswordHash, Role, FirstName, LastName, requiresPasswordChange) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, email, hashedPassword, role, firstName, lastName, true] // Include the generated username
    );
    res.send({ message: "HR user added successfully." });
  } catch (error) {
    console.error("Error adding HR user:", error);
    res
      .status(500)
      .send({ message: "Failed to add HR user.", error: error.message });
  }
};

// Remove User
const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Users WHERE UserID = ?", [id]);
    res.send({ message: "HR user removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to remove HR user." });
  }
};

// Export functions
module.exports = {
  getAllUsers,
  addHRUser,
  removeUser,
};
