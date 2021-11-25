const jwt = require('jsonwebtoken');
const db = require('../models/db');
const User = db.user;

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.plantmejwt;
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
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({ success: false, message: 'Not Authorized' });
  }
};

const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.plantmejwt;
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
        res.status(401).send({ success: false, message: 'Not Authorized' });
      }
      req.user = user.dataValues;
      next();
    });
  } catch (err) {
    res.status(401).send({ success: false, message: 'Not Authorized' });
  }
};

module.exports = {
  authUser,
  authAdmin,
};
