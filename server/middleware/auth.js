const jwt = require('jsonwebtoken');
const db = require('../models/db');
const User = db.user;

const authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);    
    User.findByPk(decoded.user.id).then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Does Not Exists.', data: {} });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({ success: false, message: 'Not Authorized', data: {} });
  }
};

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    User.findByPk(decoded.user.id).then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Does Not Exists.' });
      }
      if (!user.isAdmin) {
        return res.status(401).send({ success: false, message: 'Not Authorized', data: {} });
      }
      req.user = user.dataValues;
      next();
    });
  } catch (err) {
    res.status(401).send({ success: false, message: 'Not Authorized', data: {} });
  }
};

module.exports = {
  authUser,
  authAdmin,
};
