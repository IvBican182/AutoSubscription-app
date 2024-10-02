const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../db");


// Helper function to generate JWT (it generates a token).
const generateToken = (user) => {
    return jwt.sign({ id: user.id, user_email: user.user_email, role: user.user_role }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
  };

//async function for user registration
const userSignUp = async(req,res) => {
  //getting our form details from the body
    const { first_name, last_name, user_email, hashed_password,user_age, role_id, group_id = null } = req.body;

    try {
          // checks if user already exists
          const existingUser = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email]);
          if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' }); //throwing an error
          }
      
          // Hash the user password
          const hashedPassword = await bcrypt.hash(hashed_password, 10);
      
          // Save the user to the "newUser" variable
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

  // user login async function
  const userLogin = async(req,res) => {
    //getting login details from the body
    const { user_email, hashed_password} = req.body;
    
    //checking if the user exists, if there isn't a user row where user_email is equal to entered email, show an error
    try { 
      const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
      if(!existingUser.rows) {
        return res.status(404).json({ message: "Wrong email or password !" })
      };

      //if user exists, hash a password and compare it to a hashed password in the database
      const isMatch = await bcrypt.compare(hashed_password, existingUser.rows[0].hashed_password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      //generate a token
      const token = generateToken(existingUser.rows[0]);
      //respond with user and token
      res.json( { user: existingUser.rows[0] , token })

   
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "server error" });

    }
  };

  //export functions
  module.exports = { userSignUp, userLogin };
  
