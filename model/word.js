const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
	word: { type: String, required: true, unique: true },
	originalword: { type: String, rquired: true },
	tips: [{ type: String }],
	contributors: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Word", WordSchema);
