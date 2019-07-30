const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

// @rout POST api/pay/sendtip
// @desc send tip from tipper user's customer token to tippee's stripe account
//       assumes tipper has a payment card saved to the customer
// @params ammount, id, tippeeid
router.post("/sendtip", (req, res) => {
    const amount = req.body.amount;

    //Find recipient tippee document
    Tippee.findOne({ _id: req.body.tippeeid }).then(tippee =>{
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }

        // Find user tipper document
        Tipper.findOne({ userid: req.body.id }).then(tipper => {
            if (!tipper) {
                return res.status(404).json({ tippernotfound: "Tipper not found" });
            }

            // Start stripe session
            const stripe = require("stripe")(keys.secretTestKey);

            // stripe.customers.retrieve(
            //     tipper.stripeCustomer,
            //     (err, customer) => {
            //         if(err) throw err;

                    
            //     }
            // );

            // Create destination charge
            stripe.charges.create({
                amount: amount,
                currency: "usd",
                customer: tipper.stripeCustomer,
                transfer_data: {
                    destination: tippee.stripeAccount
                }
            }).then(charge => {
                const date = Date.now();

                // Create new transaction document
                const newTransaction = new Transaction({
                    charge: charge.id,
	                tippee: tippee.id,
	                stripeAccount: tippee.stripeAccount,
                    tipper: tipper.id,
	                stripeCustomer: tipper.stripeCustomer,
	                date: date,
	                amount: amount
                });

                const transaction = { 
                    "transactionid": newTransaction.id,
                    "charge": charge.id,
                    "tippee": tippee.id,
                    "stripeAccount": tippee.stripeAccount,
                    "tipper": tipper.id,
                    "stripeCustomer": tipper.stripeCustomer,
                    "date": date,
                    "amount": amount
                };

                // Push transaction to tipper and tippee and save
                tipper.transactionHistory.push(transaction);
                tipper.save();

                tippee.transactionHistory.push(transaction);
                tippee.balanceUSD += amount;
                tippee.save();

                newTransaction.save();

                res.json({
                    success: true,
                    charge: charge
                });
            });
        });
    });  
});

router.post("/sendguesttip", (req,res) => {

});

// @route POST api/stripe/payout
// @desc Transfer funds from the stripe platform to the tippee's connected bank
// @params id
router.post("/payout", (req, res) => {
    // find tippee document and get balance and stripeAccount
    // stripe.transfers.create a transfer with amount = balance and destination = stripeAccount 
});

module.exports = router;