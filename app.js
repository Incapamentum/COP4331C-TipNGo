const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv').config();

const articles = require('./routes/articlesRoute.js');
const users = require('./routes/usersRoute.js');
const config = require('./config.js');

const MONGODB_URI = config.mongodburi || 'mongodb://user:password1@ds247827.mlab.com:47827/heroku_9lgcjlsf';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

let app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (req.method === 'OPTIONS') {
         res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
         return res.status(200).json({});
     }
     next();
});

app.use('/api/articles', articles);
app.use('/api/users', users);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
