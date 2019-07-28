const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

// @rout POST api/pay/sendtip
// @desc send tip from tipper user's saved card token to tippee's stripe account
//       assumes tipper has payment token saved
// @params ammount, userid, tippeeid
router.post("/sendtip", (req, res) => {
    const amount = req.body.amount;

    //Find recipient tippee document
    Tippee.findOne({ _id: req.body.tippeeid }).then(tippee =>{
        if (!tippee) {
            return res.status(404).json({ tippeenotfound: "Tippee not found" });
        }

        // Find user tipper document
        Tipper.findOne({ userid: req.body.userid }).then(tipper => {
            if (!tipper) {
                return res.status(404).json({ tippernotfound: "Tipper not found" });
            }

            // Start stripe session
            const stripe = require("stripe")(keys.secretTestKey);

            // Create destination charge
            stripe.charges.create({
                amount: amount,
                currency: "usd",
                source: tipper.paymentToken,
                transfer_data: {
                    destination: tippee.stripeAccount
                }
            }).then(charge => {
                const date = Date.now();

                // Create new transaction document
                const newTransaction = new Transaction({
	                tippee: tippee,
	                stripeAccount: tippee.stripeAccount,
                    tipper: tipper,
	                sendingToken: tipper.paymentToken,
	                date: date,
	                amount: amount
                });

                const transaction = { 
                    "transactionid": newTransaction.id,
                    "tippee": tippee,
                    "stripeAccount": tippee.stripeAccount,
                    "tipper": tipper,
                    "sendingToken": tipper.paymentToken,
                    "date": date,
                    "amount": amount
                };

                // Push transaction to tipper and tippee and save
                tipper.transactionHistory.push(transaction);
                tipper.save();

                tippee.transactionHistory.push(transaction);
                tippee.balanceUSD += amount;
                tippee.save();

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

module.exports = router;