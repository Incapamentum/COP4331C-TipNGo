const express = require("express");
const router = express.Router();

const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");
const User = require("../../models/User");

// @route POST api/accounts/findtipper
// @desc Request tipper document by id
// @params id
router.post("/findtipper", (req, res) => {
    const userid = req.body.id;

    Tipper.findOne({ userid }).then(tipper => {
        if (!tipper) {
            return res.status(404).json({ tippernotfound: "Tipper not found" });
        }
        res.json(tipper);
    });
});

// @route POST api/accounts/findtippee
// @desc Request tippee document by id
// @params id
router.post("/findtippee", (req, res) => {
    const userid = req.body.id;

    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }
        res.json(tippee);
    });
});

router.post("/findalltippees", (req, res) => {
    Tippee.find({}, (err, tippees) => {

        const results = [{
            userName: String,
            tippeeid: String
        }];

        tippees.forEach((tippee) => {
            t = {userName: tippee.userName, tippeeid: tippee.id};
            results.push(t);
        });

        res.json({results: results});
    });
});

// @route api/accounts/deletetippee
// @desc Deletes or disables all information associated with user including stripe
//       account, tippee document, and user document
// @params id
router.post("/deletetippee", (req, res) => {

});

// @route api/accounts/delete/tipper
router.post("/deletetipper", (req, res) => {

});

// @route api/accounts/transactionhistory
// @desc Responds with array of transaction objects (not models) from
//       either the tipper or tippee document (detects which type)
// @params id
router.post("/transactionhistory", (req, res) => {
    const userid = req.body.id;

    User.findOne({ _id: req.body.id }).then(user => {
        if (!user) {
            return res.status(404).json({ usernotfound: "User not found" });
        }

        if (user.usertype === "tipper") {
            Tipper.findOne({ userid }).then(tipper => {
                if (!tipper) {
                    return res.status(404).json({ tippernotfound: "User found, but tipper not found" });
                }
                res.json({
                    success: true,
                    transactionHistory: tipper.transactionHistory
                });
            });
        } else {
            Tippee.findOne({ userid }).then(tippee => {
                if(!tippee) {
                    return res.status(404).json({ tippeenotfound: "User found, but tippee not found" });
                }
                res.json({
                    success: true,
                    transactionHistory: tippee.transactionHistory
                });
            });
        }
    });
});

// @route POST api/accounts/searchbyusername
// @desc retrieve Tippee account document by searching with username
// @params username
router.post("/searchbyusername", (req, res) => {
    Tippee.findOne({ userName: req.body.username }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }
        res.json(tippee);
    });
});

// @route POST api/accounts/searchbyemail
// @desc retrieve Tippee account document by searching with email
// @params email
router.post("/searchbyemail", (req, res) => {
    Tippee.findOne({ email: req.body.email }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }
        res.json(tippee);
    });
});

// @route POST api/accounts/setlocation
// @desc Set Tippee place of work by zipcode and world coordinates
// @params id (of associated user), zip_code, latitude, longitude
router.post("/setlocation", (req, res) => {
    Tippee.findOne({ userid: req.body.id }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }

        tippee.zip_code = req.body.zipcode;
        tippee.location.latitude = req.body.latitude;
        tippee.location.longitude = req.body.longitude;

        tippee.save()
                .then(tippee => res.json({
                    success: true,
                    tippee: tippee
                }))
                .catch(err => console.log(err));
    });
});

// @routes POST api/accounts/searchbylocation (NOT YET IMPLEMENTED)
// @desc Retrieve Tippee account document after searching by coordinates and
//       narrowing the search by zip code and range from coordinates.
// @params zip_code, range, latitude, longitude
router.post("/searchbylocation", (req, res) => {
    // Lat and long ranges are weird and non-trigonometrical
    // This range is about a radius of two miles from target location
    const range = 0.033;

    // Extract and parse location data from request
    const zip_code = req.body.zip_code;
    const target_lat = parseFloat(req.body.latitude);
    const target_long = parseFloat(req.body.longitude);

    // Find Tippees within the indicated zip code
    Tippee.find({ zip_code: zip_code }).then(tippees => {
        if (tippees === undefined || tippees.length == 0) {
            return res.status(404).json({ notippeesfound: "No Tippees in zip code" });
        }

        // Empty array for results
        const results = [];

        // Loop over returned tippees, calculate distance formula
        tippees.forEach(tippee => {
            tippee_lat = parseFloat(tippee.location.latitude);
            tippee_long = parseFloat(tippee.location.longitude);


            // Calculate distance between Tippee and target location
            const distance_between = Math.sqrt(Math.pow((tippee_lat - target_lat),2) + Math.pow((tippee_long - target_long),2));

            // Add to result arrray if within given distance range
            if (distance_between < range) {
                results.push(tippee);
            }
        });


        if (results.length == 0) {
            return res.status(404).json({ notippeesinrange: "No Tippees in given range" });
        }

        res.json(results);

    });
});

module.exports = router;
