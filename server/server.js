const express = require("express");
const app = express();
const { apiRouter } = require("./routes/apiRouter");

// ****** DOTENV ******
require("dotenv").config();

// ****** MIDDLEWEAR ******
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ****** CORS ******
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // to change later with whitelist domains
  res.header("Access-Control-Allow-Method", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// ****** ROUTES ******
app.use("/api/v1/", apiRouter);

// ****** SERVER LAUNCH ******
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
