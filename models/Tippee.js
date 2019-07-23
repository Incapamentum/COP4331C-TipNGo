const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TippeeSchema = new Schema({
	tippeeTag: {
		type: String
	},
	stripeAccount: {
		type: String
	},
	photoPath: {
		type: String
	},
	commendations: {
		type: [String]
	},
	balanceUSD: {
		type: Number, // saved as an integer; divided by 100 to calculate dollars and cents
		default: 0
	},
	location: {
		x: { type: Number },
		y: { type: Number }
	},
	tos_acceptance: {
        date: Date,
        ip: String,
        user_agent: String
    }
});

module.exports = Tippee = mongoose.model("tippees", TippeeSchema);
