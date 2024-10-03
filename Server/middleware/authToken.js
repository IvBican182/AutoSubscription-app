const jwt = require("jsonwebtoken");
require("dotenv").config({
    override: true,
});

const verifyToken = (req, res, next) => {
  //extracting the token from the header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token format

  if (token == null) {
    //if no token found in the request send an error
    return res.status(401).json({ message: 'Token is required' });
  }

  //logs the token to make sure we get it
  console.log("Token received:", token);

  //verify the received token 
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      //if token is invalid or expired send and error
      return res.status(403).json({ message: 'Invalid token' });
    }

    //if token is valid, store the user data in request 
    req.user = user;

    //call the next middleware 
    next();
  });
};

module.exports = { verifyToken };
