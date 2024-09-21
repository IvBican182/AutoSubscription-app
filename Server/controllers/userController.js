const pool = require("../db");

const fetchUsers = async(req, res) => {
    
    
    try {
        const users = await pool.query("SELECT * FROM users");
        res.status(200).json({users: users.rows});

    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to fetch groups" });

    }

}

module.exports = { fetchUsers };