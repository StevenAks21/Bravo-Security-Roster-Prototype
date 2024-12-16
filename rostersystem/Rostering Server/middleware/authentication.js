const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Ensure this matches the key used when signing the JWT

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ error: true, message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: 'Invalid token.' });
    }

    req.user = user; // Attach the decoded user information to the request object
    next();
  });
};

module.exports = authenticateToken;
