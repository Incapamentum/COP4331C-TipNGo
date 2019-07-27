const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
	transactionID: {
        type: String
    },
    tippee: {
        type: String
    },
    tippeeName: {
        type: String
    },
    receivingStripeAccount: {
        type: String
    },
    tipper: {
        type: String
    },
    tipperName: {
        type: String
    },
    sendingPaymentToken: {
        type: String
    },
    ammount: {
        type: Number
    },
    date: {
        type: Date
    },
    success: {
        type: Boolean
    }
});

module.exports = Transaction = mongoose.model("transactions", TransactionSchema);
