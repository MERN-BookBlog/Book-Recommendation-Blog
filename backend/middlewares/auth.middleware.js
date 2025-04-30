const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.Auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found in cookies.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies token using the same secret
    req.user = decoded; // Attaches decoded user info to the request
    next(); // Proceeds to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
