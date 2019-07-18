const mongoose = require("mongoose");
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
	}
});

module.exports = Tipper = mongoose.model("tipper", TipperSchema);
