const mongoose = require("mongoose");
const Transaction = require("./Transaction").schema;
const Schema = mongoose.Schema;

// Create Schema
const TippeeSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	userid: {
		type: String
	},
	userName: {
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
	transactionHistory: [{
		transactionid: String,
		tippee: String,
		stripeAccount: String,
		tipper: String,
		sendingToken: String,
		date: Date,
		amount: Number
	}],
	balanceUSD: {
		type: Number, // saved as an integer; divided by 100 to calculate dollars and cents
		default: 0
	},
	location: {
		zip_code: { type: Number },
		x: { type: Number },
		y: { type: Number }
	}
});

module.exports = Tippee = mongoose.model("tippees", TippeeSchema);
