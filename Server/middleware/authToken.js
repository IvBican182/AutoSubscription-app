const jwt = require("jsonwebtoken");
require("dotenv").config({
    override: true,
});

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token format

  if (token == null) {
    // No token found in the request
    return res.status(401).json({ message: 'Token is required' });
  }

  // Log the token to debug
  console.log("Token received:", token);

  // Verify the token
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      // Invalid or expired token
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Token is valid, store the decoded user data in request for later use
    req.user = user;

    // Call the next middleware or route handler
    next();
  });
};

module.exports = { verifyToken };
