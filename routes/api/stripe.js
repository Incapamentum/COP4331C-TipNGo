const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load input validation
const validateStripeAccountInput = require("../../validation/stripeAccount");

// @route POST api/stripe/editstripe
// @desc Edit details of Stripe account
router.post("/editstripe", (req, res) => {
    // Form validation
    const { stripeErrors, isValidStripe } = validateStripeAccountInput(req.body);

    // Check form validation
    if(!isValidStripe) {
		return res.statusMessage(400).json(stripeErrors);
    }
    
    const stripe = require("stripe"(keys.secretTestKey));

    stripe.accounts.update(
        req.body.stripeAccount,
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
                dob: req.body.dob,
                ssn_last_4: req.body.ssn_last_4
            }
        }
    );
});

// @route POST api/stripe/addbankaccount
// @desc Add a bank account by token to an existing stripe account
router.post("/addbankaccount", (req, res) => {
    // Instantiate a Stripe connection
    const stripe = require("stripe"(keys.secretTestKey));

    stripe.accounts.createExternalAccount(
        req.body.stripeAccount,
        {
            external_account: req.body.bank_account
        }, (err, bank_account) => {
            if(err) throw err;
        }
    );
});

module.exports = router;