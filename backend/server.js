const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

//Deployment version: connects to mLab//////////////////////////////////////////////////////////////////////////////
// mongoose.connect('mongodb://heroku_9lgcjlsf:rhnbma5b96masjo0chuou34j2d@ds247827.mlab.com:47827/heroku_9lgcjlsf');
// const connection = mongoose.connection;

// connection.once('open', function() {
//     console.log("MogoDB connection established");
// });

// app.listen(processes.env.PORT || PORT, function() {
//     console.log("Server running");
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Testing version: connects to local database (if you have a local database at the declared location)//////////////
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MogoDB connection established");
});

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

