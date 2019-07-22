const mongoose = require("mongoose");
const transactions = require("./Transaction");
const Schema = mongoose.Schema;

// Create Schema
const TipperSchema = new Schema({
	userid: {
		type: String,
		required: true
	},
	paymentTokens: {
		type: [String],
		default: []
	},
	transactionHistory: {
		type: [transactions]
	}
});

module.exports = Tipper = mongoose.model("tippers", TipperSchema);
