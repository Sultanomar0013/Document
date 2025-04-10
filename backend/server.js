const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
