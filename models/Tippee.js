const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TippeeSchema = new Schema({
	userid: {
		type: String,
		required: true
	},
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
	}
});

module.exports = Tippee = mongoose.model("tippees", TippeeSchema);
