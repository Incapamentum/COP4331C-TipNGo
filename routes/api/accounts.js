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

router.post("/searchbylocation", (req, res) => {

});

module.exports = router;
