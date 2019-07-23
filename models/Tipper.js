const mongoose = require("mongoose");
const transactions = require("./Transaction");
const Schema = mongoose.Schema;

// Create Schema
const TipperSchema = new Schema({
	paymentTokens: {
		type: [String],
		default: []
	},
	tos_acceptance: {
        date: Date,
        ip: String,
        user_agent: String
	},
	transactionHistory: {
		type: [transactions]
	}
});

module.exports = Tipper = mongoose.model("tippers", TipperSchema);
