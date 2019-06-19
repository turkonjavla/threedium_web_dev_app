const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied' })
  }

  const { JWT_SECRET } = process.env;

  // verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  }
  catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ msg: 'Token is not valid' });
  }
}