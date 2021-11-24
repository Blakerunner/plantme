const express = require('express');
const app = express();
const cors = require('cors');
const adminController = require('./controllers/adminController');
const { userRouter } = require('./routes/userRouter');
const { plantRouter } = require('./routes/plantRouter');
const { adminRouter } = require('./routes/adminRouter');
const { authRouter } = require('./routes/authRouter');

// ****** DOTENV ******
require('dotenv').config();

// ****** MIDDLEWEAR ******
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// ****** TRACK AND UPDATE REQUESTS ******
app.use(adminController.updateEndpoint);

// ****** ROUTES ******
app.use('/api/v1/user', userRouter);
app.use('/api/v1/plant', plantRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);

// ****** SERVER LAUNCH ******
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
