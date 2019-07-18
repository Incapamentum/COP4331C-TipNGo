const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TippeeSchema = new Schema({
	userid: {
		type: String,
		required: true
	},
	stripeAccount: {
		type: [String],
		default: []
	}
});

module.exports = Tippee = mongoose.model("tippee", TippeeSchema);
