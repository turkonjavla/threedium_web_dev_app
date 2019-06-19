require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

/* Connect to mongodb */
connectDB();

/* Middleware */
app.use(express.json());

/* Routes */
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, process.env.IP, () => {
  console.log('Server is running');
});