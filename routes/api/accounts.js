const express = require("express");
const router = express.Router();

const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");

// @route POST api/accounts/findtipper
// @desc Request tipper document by id
router.post("/findtipper", (req, res) => {
    const userid = req.body.id;

    Tipper.findOne({ userid }).then(tipper => {
        if (!tipper) {
            return res.status(404).json({ tippernotfound: "Tipper not found" });
        }

        res.json(tipper);
    })
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
    })
});

router.post("/deletetippee", (res, req) => {

});

router.post("/deletetipper", (res, req) => {

});

module.exports = router;
