const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load input validation
const validateStripeAccountInput = require("../../validation/stripeAccount");

// Load models
const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");

// @route POST api/stripe/editstripe
// @desc Update or edit details of Stripe account
// @params id, phone, city, line1, line2, postal_code, state,
//         date, month, year, ssn_last_4
router.post("/editstripe", (req, res) => { 
    /*
    // Form validation
    const { stripeErrors, isValidStripe } = validateStripeAccountInput(req.body);
    
    Check form validation
    if(!isValidStripe) {
		return res.status(400).json(stripeErrors);
    }
    */
    
    // Start Stripe session
    const stripe = require("stripe")(keys.secretTestKey);

    // Extract user id form request
    const userid = req.body.id;

    // Find tippee in database to get stripe account id
    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        } else {
            // Tippee found, retrieve account and check if SSN has been provided
            stripe.accounts.retrieve(
                tippee.stripeAccount,
                function(err, account) {
                    if (err) throw err;

                    // Detect if SSN has been set
                    if (account.individual.ssn_last_4_provided) {
                        // Edit Stripe account, don't touch SSN
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
                                        day: req.body.date,
                                        month: req.body.month,
                                        year: req.body.year
                                    }
                                }
                            }, (err, account) => {
                                // Handle errors and respond with account
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    account: account
                                });
                        });

                    } else {
                        // Edit Stripe account, including SSN
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
                                        day: req.body.date,
                                        month: req.body.month,
                                        year: req.body.year
                                    },
                                    ssn_last_4: req.body.ssn_last_4
                                },
                                settings: {
                                    payouts: {
                                        schedule: {
                                            interval: "manual"
                                        }
                                    }
                                }
                            }, (err, account) => {
                                // Handle errors and respond with account
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    account: account
                                });
                        });
                    }
                }
            );
        }
    });
});

// @route POST api/stripe/addbankaccount
// @desc Add a bank account by token to an existing stripe account
// @params id, token (generated by stripe.createToken(bank_account))
router.post("/addbankaccount", (req, res) => {
    // Instantiate a Stripe connection
    const stripe = require("stripe")(keys.secretTestKey);

    // Extract user id from request
    const userid = req.body.id;

    console.log(req.body);
    // Find tippee in database to get stripe account id
    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        } else {
            // Attach bank account token to stripe account
            stripe.accounts.createExternalAccount(
                tippee.stripeAccount,
                {
                    external_account: req.body.token.id
                }, (err, bank_account) => {
                    if (err) throw err;
                    // Respond with bank account
                    res.json({
                        success: true,
                        bank_account: bank_account
                    });
            });
        }
    });
});

// @route POST api/stripe/retrievestripe
// @desc responds with the stripe account json object
// @params id
router.post("/retrievestripe", (req, res) => {
    // Instantiate a Stripe connection
    const stripe = require("stripe")(keys.secretTestKey);

    // Extract user id from request
    const userid = req.body.id;

    // Find tippee in database to get stripe account id
    Tippee.findOne({ userid }).then(tippee => {
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        } else {
            // Attach bank account token to stripe account
            stripe.accounts.retrieve(
                tippee.stripeAccount,
                (err, account) => {
                    if (err) throw err;
                    // Respond with account object
                    res.json({
                        account: account
                    });
            });
        }
    });
});

// @route POST api/accounts/setpaymenttoken
// @desc Set a card token to a tipper account to use in account charges
// @params id, token (generated by client-side token.create)
//         TO DELETE CARD: set "token": {"id": null}
router.post("/setpaymenttoken", (req, res) => {
    // Start stripe session
    const stripe = require("stripe")(keys.secretTestKey);

    // Extract user id from request
    const userid = req.body.id;

    // Find tipper with userid
    Tipper.findOne({ userid }).then(tipper => {
        if(!tipper) {
            return res.status(404).json({ tippernotfound: "Tipper not found" });
        }
        // Attach card token to tipper customer
        stripe.customers.update(
            tipper.stripeCustomer,
            {
                source: req.body.token.id
            }, (err, customer) => {
                if (err) throw err;
                // Respond with customer object
                res.json({
                    success: true,
                    customer: customer
                });
            }
        );
    })
});

module.exports = router;