const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TipperSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	userid: {
		type: String
	},
	stripeCustomer: {
		type: String
	},
	transactionHistory: [{
		transactionid: String,
		tippee: String,
		stripeAccount: String,
		tipper: String,
		stripeCustomer: String,
		date: Date,
		amount: Number
	}]
});

module.exports = Tipper = mongoose.model("tippers", TipperSchema);
