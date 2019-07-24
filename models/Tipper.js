const mongoose = require("mongoose");
const transactions = require("./Transaction");
const Schema = mongoose.Schema;

// Create Schema
const TipperSchema = new Schema({
	email: { // FK
		type: String
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
