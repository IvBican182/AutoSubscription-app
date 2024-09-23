const pool = require("../db");
const bcrypt = require('bcrypt');

const fetchUsers = async(req, res) => {
    
    
    try {
        const users = await pool.query("SELECT * FROM users");
        res.status(200).json({users: users.rows});

    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to fetch groups" });

    }

};

const fetchSingleUser = async(req,res) => {
    const userId = req.params.id; 
    try {
        const user = await pool.query("SELECT first_name, last_name, user_email, user_age, group_id FROM users WHERE id = $1", [userId])
        res.status(200).json({ user: user.rows });

    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "User not found" });

    }
};

const updateUser = async(req, res) => {
    const { first_name, last_name, user_email, hashed_password } = req.body;
    const id = req.params.id;

    try {
        const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if(user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(hashed_password, 10);

        const updateResult = await pool.query("UPDATE users SET first_name = $1, last_name = $2, user_email = $3, hashed_password = $4 WHERE id = $5", 
            [first_name, last_name, user_email, hashedPassword, id ] );

            console.log('Update Result:', updateResult);

        const updatedUserDetails = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        res.json({ user: updatedUserDetails.rows[0] });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });

    }

    

}

module.exports = { fetchUsers, fetchSingleUser, updateUser };