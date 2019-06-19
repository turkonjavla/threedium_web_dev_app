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
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

app.listen(PORT, process.env.IP, () => {
  console.log('Server is running');
});