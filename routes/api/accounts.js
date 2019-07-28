const express = require("express");
const router = express.Router();

const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");
const User = require("../../models/User");

// @route POST api/accounts/findtipper
// @desc Request tipper document by id
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
router.post("/findtippee", (req, res) => {
    const userid = req.body.id;

    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }

        res.json(tippee);
    });
});

router.post("/deletetippee", (req, res) => {

});

router.post("/deletetipper", (req, res) => {

});

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
                    transactionhistory: tipper.transactionhistory
                });
            });
        } else {
            Tippee.findOne({ userid }).then(tippee => {
                if(!tippee) {
                    return res.status(404).json({ tippeenotfound: "User found, but tippee not found" });
                }
                res.json({
                    success: true,
                    transactionhistory: tippee.transactionhistory
                });
            });
        }
    });
});

router.post("/searchbyusername", (req, res) => {
    Tippee.findOne({ userName: req.body.username }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }
        res.json(tippee);
    });
});

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
