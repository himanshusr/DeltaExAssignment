const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
  //Get the token from the header
  //const token = req.header('x-auth-token');
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    //check if no token
    if (!token) {
      return res.status(401).json({
        msg: 'No token, authorization denied',
      });
    }

    //Verify token

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({
      msg: 'Please authenticate first',
    });
  }
};
