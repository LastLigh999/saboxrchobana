const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, unique: true, required: true },
	originalUsername: { type: String, required: true },
	password: { type: String, required: true },
	initials: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
