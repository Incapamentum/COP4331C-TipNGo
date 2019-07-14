const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");

//app.use(cors());
//app.use(bodyParser.json());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const localPORT = 5000;

//Deployment version: connects to mLab//////////////////////////////////////////////////////////////////////////////
const mongoURI = require("./config/keys").mongoURI;

mongoose
    .connect(
        mongoURI, {useNewUrlParser: true}
    )
    .then( () => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// Serve statiac assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || localPORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Testing version: connects to local database (if you have a local database at the declared location)//////////////
// mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once('open', function() {
//     console.log("MogoDB connection established");
// });

// app.listen(PORT, function() {
//     console.log("Server is running on port " + PORT);
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
