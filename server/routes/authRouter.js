const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const StatReport = require("../StatReport");
const auth = require("../middleware/auth");

const users = [
  { email: "jieun@gmail.com", password: "123123" },
  { email: "jay@gmail.com", password: "123123" },
  { email: "jagi@gmail.com", password: "123123" },
];

// Register a new user
authRouter.post("/register", (req, res) => {
  const { email, password } = req.body;

  try {
    users.forEach((user) => {
      if (user.email === email) {
        return res.status(400).send("User already exists");
      }
    });

    const newUser = { email, password };
    users.push(newUser);
    StatReport.statsObj["POST:/api/v1/auth/register"]++;
    return res.status(200).send("Register success");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }

  // 1. Check if a user exists in DB
  // (If a user exists, return error msg with status code 400)
  // 2. if not, create a user with email and password in DB
  // 3. if successfully created a user, return 200
  // 4. else return 500
});

// Sign in a user
authRouter.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  let targetUser;

  // Fetch a user from DB
  try {
    targetUser = users.filter((user) => user.email === email);

    if (targetUser.length === 0) {
      return res.status(400).send("User not exist");
    }

    targetUser = targetUser[0];

    if (targetUser.password !== password) {
      return res.status(400).send("Invalid credential");
    }

    const token = jwt.sign(
      {
        email,
      },
      process.env.JSONWEBTOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    if (!token) {
      return res.status(500).send("Internal server error");
    }

    StatReport.statsObj["POST:/api/v1/auth/login"]++;

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).send("Internal server error");
  }

  // 1. Check if a user exists in DB (Skip For Now)
  // (If a user not exists, return error msg with status code 400)
  // 2. if so, bring the user from DB (SFN)
  // 3. Create a token using jsonwebtoken and username
  // 4. Return the token to client with status code 200
});

// @Route   GET api/v1/logins/stats
// @access  Private
authRouter.get("/stats", auth, (req, res) => {
  res.status(200).json(StatReport.statsObj);
});

module.exports = {
  authRouter,
};
