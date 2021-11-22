const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.plantme_token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = auth;
