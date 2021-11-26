const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const adminController = require('./controllers/adminController');
const { userRouter } = require('./routes/userRouter');
const { plantRouter } = require('./routes/plantRouter');
const { adminRouter } = require('./routes/adminRouter');
const { authRouter } = require('./routes/authRouter');

// ****** DOTENV ******
require('dotenv').config();

// ****** DATABASE INIT ******
require('./models/db');

// ****** MIDDLEWEAR ******
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(cookieParser());

// CORS
let whitelist = process.env.WHITELIST.split(',');
console.log('🚀 ~ file: server.js ~ line 22 ~ whitelist', whitelist);

let corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  allowedHeaders: [
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));

// Track and update endpoint admin stats
app.use(adminController.updateEndpoint);

// ****** ROUTES ******
app.use('/api/v1/user', userRouter);
app.use('/api/v1/plant', plantRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);

// ****** SERVER LAUNCH ******
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
