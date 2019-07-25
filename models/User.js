const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	usertype: {
		type: String
	},
	firstname: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	}
});

module.exports = User = mongoose.model("users", UserSchema);
