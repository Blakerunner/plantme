const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const userData = require('../data/userData');

// TEMP USERS
const users = [
  {
    email: 'jieun@gmail.com',
    password: '123123',
    id: '57b36674-c2b7-4d38-b1b9-77158ba1acaa',
    plants: [],
  },
  {
    email: 'jay@gmail.com',
    password: '123123',
    id: '57b36674-c2b7-4d38-b1b9-77158ba1acad',
    plants: [],
  },
  {
    email: 'jagi@gmail.com',
    password: '123123',
    id: '57b36674-c2b7-4d38-b1b9-77158ba1acak',
    plants: [],
  },
  {
    email: 'test@gmail.com',
    password: '123123',
    id: '57b36674-c2b7-4d38-b1b9-77158ba1acab',
    plants: [],
  },
  {
    email: 'admin@gmail.com',
    password: '1234abcd',
    id: '57b36674-c2b7-4d38-b1b9-77158ba1acax',
    plants: [],
  },
];

authRouter.get('/', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
    const id = decoded.id;
    const filteredUser = users.filter((user) => user.id === id);
    console.log(filteredUser);
    if (!filteredUser || filteredUser.length > 1) {
      return res.status(500).send('Internal server error');
    }
    const data = { id: filteredUser[0].id, plants: filteredUser[0].plants };
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Internal server error');
  }
});

// Register a new user
authRouter.post('/register', (req, res) => {
  const { email, password } = req.body;

  try {
    const filteredUser = users.filter((user) => user.email === email);
    console.log(filteredUser);
    if (filteredUser.length > 0) {
      return res.status(400).send('User already exists');
    }

    const id = uuidv4();

    const newUser = { email, password, id };
    users.push(newUser);
    return res.status(200).send('Register success');
  } catch (error) {
    return res.status(500).send('Internal server error');
  }

  // 1. Check if a user exists in DB
  // (If a user exists, return error msg with status code 400)
  // 2. if not, create a user with email and password in DB
  // 3. if successfully created a user, return 200
  // 4. else return 500
});

// Sign in a user
authRouter.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  let targetUser;

  // Fetch a user from DB
  try {
    targetUser = users.find((user) => user.email === email);
    console.log(targetUser);

    if (!targetUser) {
      return res.status(400).send('User does not exist');
    }

    if (targetUser.password !== password) {
      return res.status(400).send('Invalid credential');
    }

    const token = jwt.sign(
      { email, id: targetUser.id },
      process.env.JSONWEBTOKEN_SECRET,
      { expiresIn: '7d' }
    );

    if (!token) {
      return res.status(500).send('Internal server error - token');
    }

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).send('Internal server error');
  }

  // 1. Check if a user exists in DB (Skip For Now)
  // (If a user not exists, return error msg with status code 400)
  // 2. if so, bring the user from DB (SFN)
  // 3. Create a token using jsonwebtoken and username
  // 4. Return the token to client with status code 200
});

// @Route   GET api/v1/logins/stats
// @access  Private
authRouter.get('/stats', auth, (req, res) => {
  res.status(200).json(StatReport.statsObj);
});

module.exports = {
  authRouter,
};
