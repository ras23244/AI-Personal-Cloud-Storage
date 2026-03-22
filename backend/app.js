
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('./routes/authRoute');
const uploadRoute = require('./routes/uploadRoute');
const searchRoute = require('./routes/searchRoute');
const fileRoute = require('./routes/fileRoute');


const connectDB = require('./config/mongo');

// Start the file processor worker as part of app startup
require('./worker/fileProcessor');

connectDB();

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: false,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', authRoute);
app.use('/upload', uploadRoute);
app.use('/search', searchRoute);
app.use('/files', fileRoute);

app.get('/', (req, res) => {
    res.send('Server running');
});

module.exports = app;