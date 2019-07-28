const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load input validation
const validateStripeAccountInput = require("../../validation/stripeAccount");

// @route POST api/stripe/editstripe
// @desc Edit details of Stripe account
// @params the request must contain the id of the user
router.post("/editstripe", (req, res) => { 
    // Form validation
    const { stripeErrors, isValidStripe } = validateStripeAccountInput(req.body);

    // Check form validation
    if(!isValidStripe) {
		return res.status(400).json(stripeErrors);
    }
    
    // Start Stripe session
    const stripe = require("stripe")(keys.secretTestKey);

    // Extract user id form request
    const userid = req.body.userid;

    // Find tippee in database to get stripe account id
    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        } else {
            stripe.accounts.update(
                tippee.stripeAccount,
                {
                    individual: {
                        phone: req.body.phone,
                        address: {
                            city: req.body.city,
                            country: "US",
                            line1: req.body.line1,
                            line2: req.body.line2,
                            postal_code: req.body.postal_code,
                            state: req.body.state,   
                        },
                        dob: {
                            day: req.body.day,
                            month: req.body.month,
                            year: req.body.year
                        },
                        ssn_last_4: req.body.ssn_last_4
                    }
                }, (err, account) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        account: account
                    });
            });
        }
    });
});

// @route POST api/stripe/addbankaccount
// @desc Add a bank account by token to an existing stripe account
router.post("/addbankaccount", (req, res) => {
    // Instantiate a Stripe connection
    const stripe = require("stripe")(keys.secretTestKey);

    // Extract user id from request
    const userid = req.body.userid;

    // Find tippee in database to get stripe account id
    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        } else {
            stripe.accounts.createExternalAccount(
                tippee.stripeAccount,
                {
                    external_account: req.body.token.id
                }, (err, bank_account) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        bank_account: bank_account
                    });
            });
        }
    });
});

router.post("/payout", (req, res) => {

});

module.exports = router;