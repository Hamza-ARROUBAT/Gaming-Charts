const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// config server
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// getting routers
const select = require('./api/routers/select');

// adding routers
app.use('/', select);

// run the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
