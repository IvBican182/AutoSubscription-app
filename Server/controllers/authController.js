const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../db");
/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, user_email: user.user_email, role: user.user_role }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
  };

const userSignUp = async(req,res) => {
    const { first_name, last_name, user_email, hashed_password,user_age, role_id, group_id = null } = req.body;

    try {
          // Check if user already exists
          const existingUser = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email]);
          if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(hashed_password, 10);
      
          // Save the user
          const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, user_email, hashed_password, user_age, role_id, group_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [first_name, last_name, user_email, hashedPassword,user_age, role_id, group_id]
          );
      
          // Generate token
          const token = generateToken(newUser.rows[0]);
      
          // Respond with user and token
          res.status(201).json({ user: newUser.rows[0], token });
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: 'Server error' });
        }
  }

  const userLogin = async(req,res) => {
    const { user_email, hashed_password} = req.body;

    try {
      const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
      if(!existingUser.rows) {
        return res.status(404).json({ message: "Wrong email or password !" })
      };

      const isMatch = await bcrypt.compare(hashed_password, existingUser.rows[0].hashed_password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }





      const token = generateToken(existingUser.rows[0]);

      return res.json( { user: existingUser.rows , token })

      
   
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "server error" });

    }
  };

  module.exports = { userSignUp, userLogin };
  
