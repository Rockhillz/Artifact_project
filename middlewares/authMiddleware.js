const jwt = require('jsonwebtoken');

// exports.authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  // Retrieve token from Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    console.log(req.user);
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
