const app = require('./app');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listening on port 5000!'));
