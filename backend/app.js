const express = require('express');

const cors = require('cors');

const app = express();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);
app.use(cors());

// Define routes
app.use('/api/repos', require('./routes/repo'));

module.exports = app;