const jwt = require('jsonwebtoken');
const db = require('../models/db');
const User = db.user;

const authUser = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer.split(' ')[1];
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    User.findOne({
      where: {
        id: decoded.user.id,
        email: decoded.user.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Does Not Exists.' });
      }
    });
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: 'Not Authorized' });
  }
};

const authAdmin = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer.split(' ')[1];
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    User.findOne({
      where: {
        id: decoded.user.id,
        email: decoded.user.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: 'User Does Not Exists.' });
      }
      if (!user.isAdmin) {
        res.status(401).send({ success: false, message: 'Not Authorized' });
      }
    });
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: 'Not Authorized' });
  }
};

module.exports = {
  authUser,
  authAdmin,
};
