const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
	charge: String,
	tipper: String,
	stripeCustomer: String,
	tippee: String,
	stripeAccount: String,
	date: Date,
	amount: Number
});

module.exports = Transaction = mongoose.model("transactions", TransactionSchema);
