// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const dotenv = require('dotenv');
// const sginupMiddleware = require('./middleware/AuthMiddleware.js');
// const loginMiddleware = require('./middleware/AuthMiddleware.js');
const userRoutes = require('./routes/user');
const categoryRouter = require('./routes/categoryRoutes');
const documentRoutes = require('./routes/documentRoutes');

app.use(express.json());

dotenv.config();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options('*', cors());

dotenv.config();

const server = http.createServer(app);

app.use('/user', userRoutes);
app.use('/category', categoryRouter);
app.use('/uploads', express.static('uploads'));
app.use('/upload', documentRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world! Your server is working!');
});

server.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});