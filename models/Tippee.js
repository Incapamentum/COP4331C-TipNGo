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
	transactionHistory: [{ type: Schema.Types.ObjectId, ref: "transactions"}],
	balanceUSD: {
		type: Number, // saved as an integer; divided by 100 to calculate dollars and cents
		default: 0
	},
	location: {
		x: { type: Number },
		y: { type: Number }
	}
});

module.exports = Tippee = mongoose.model("tippees", TippeeSchema);
