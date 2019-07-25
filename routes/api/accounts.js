const express = require("express");
const router = express.Router();

const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");

// @route POST api/accounts/tipper
// @desc Request tipper document by id
router.post("/tipper", (req, res) => {
    const _id = req.body.id;

    Tipper.findOne({ _id }).then(tipper => {
        if (!tipper) {
            return res.status(404).json({ tippernotfound: "Tipper not found" });
        }

        res.json(tipper);
    })
});

// @route POST api/accounts/tippee
// @desc Request tippee document by id
router.post("/tippee", (req, res) => {
    const _id = req.body.id;

    Tippee.findOne({ _id }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }

        res.json(tippee);
    })
});

module.exports = router;