const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const token = req.headers.plantme_token;
    if (!token) {
      return res.status(401).send("No token, Authorization denied");
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: "Not Authorized" });
  }
};

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.plantme_token;
    if (!token) {
      return res.status(401).send("No token, Authorization denied");
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    req.email = decoded.email;
    decoded.isAdmin == true;
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: "Not Authorized" });
  }
};

module.exports = {
  authUser,
  authAdmin
};
