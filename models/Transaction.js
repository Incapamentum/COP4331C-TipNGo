const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
	tipper: String,
	stripeAccount: String,
	tippee: String,
	stripeCustomer: String,
	date: Date,
	amount: Number
});

module.exports = Transaction = mongoose.model("transactions", TransactionSchema);
