
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('./routes/authRoute');
const uploadRoute = require('./routes/uploadRoute');
const connectDB = require('./config/mongo');
connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', authRoute);
app.use('/upload', uploadRoute);

app.get('/', (req, res) => {
    res.send('Server running');
});

module.exports = app;