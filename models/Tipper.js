const mongoose = require("mongoose");
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
    }
});

module.exports = Tipper = mongoose.model("tippers", TipperSchema);
