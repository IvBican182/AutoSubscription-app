const pool = require("../db");
const bcrypt = require('bcrypt');

//fetch all users function
const fetchUsers = async(req, res) => {
    
    //sql query to fetch all rows from "users" table
    try {
        const users = await pool.query("SELECT * FROM users");
        res.status(200).json({users: users.rows});

    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to fetch groups" });

    }

};

//function for fetching a single user based on ID in URL
const fetchSingleUser = async(req,res) => {
    //get ID from URL
    const userId = req.params.id;
    //get the user by querying a database and selecting details where userID equals our current ID from URL 
    try {
        const user = await pool.query("SELECT first_name, last_name, user_email, user_age, group_id FROM users WHERE id = $1", [userId])
        res.status(200).json({ user: user.rows });

    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "User not found" });

    }
};

//function to update user details
const updateUser = async(req, res) => {
    //get the user details from body
    const { first_name, last_name, user_email, hashed_password } = req.body;
    //get user ID from URL
    const id = req.params.id;
    
    //select the user by querying the database, using current id
    try {
        const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if(user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }
        //hash a new password
        const hashedPassword = await bcrypt.hash(hashed_password, 10);
        //update the user in database with new details
        const updateResult = await pool.query("UPDATE users SET first_name = $1, last_name = $2, user_email = $3, hashed_password = $4 WHERE id = $5", 
            [first_name, last_name, user_email, hashedPassword, id ] );

            console.log('Update Result:', updateResult);

        const updatedUserDetails = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        //return the updated user details
        res.json({ user: updatedUserDetails.rows[0] });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });

    }

    

}

//export functions
module.exports = { fetchUsers, fetchSingleUser, updateUser };