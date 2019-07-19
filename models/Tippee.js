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
	}
});

module.exports = Tippee = mongoose.model("tippees", TippeeSchema);
