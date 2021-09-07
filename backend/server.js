const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

// Define routes
app.use('/api/repos', require('./routes/repo'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listening on port 5000!'));
