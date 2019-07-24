const mongoose = require("mongoose");
const Transaction = require("./Transaction").schema;
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
	transactionHistory: [{ type: Schema.Types.ObjectId, ref: "transactions"}]
});

module.exports = Tipper = mongoose.model("tippers", TipperSchema);
