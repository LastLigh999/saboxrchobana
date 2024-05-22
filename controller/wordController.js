const Word = require("../model/word");
const User = require("../model/user");

exports.index = (req, res) => {
	res.render("index", { title: "index" });
};

exports.createNewWordGet = (req, res) => {
	res.render("addWordForm", { title: "Create New Word", alertMessage: "" });
};
exports.createNewWordPost = async (req, res) => {
	let filteredTips = req.body.tips.filter((data) => data.trim());
	let word = new Word({
		word: req.body.word.trim().toLowerCase(),
		originalword: req.body.word,
		tips: filteredTips,
		contributors: "66354f2d7d779e3c5b661118",
	});

	try {
		let wordExists = await Word.findOne({
			word: req.body.word.trim().toLowerCase(),
		});
		if (!wordExists) {
			await word.save();
			return res.status(200).render("addWordForm", {
				title: "Create new word",
				alertMessage: "success",
			});
		}
		await Word.updateOne(
			{ word: req.body.word.trim().toLowerCase() },
			{
				$addToSet: {
					tips: { $each: filteredTips },
					contributors: req.body.user,
				},
			}
		);
		res.status(200).render("addWordForm", {
			title: "Create new word",
			alertMessage: "success",
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
};

exports.playGameGet = async (req, res) => {
	try {
		let word = await Word.aggregate([
			{ $addFields: { tipsLength: { $size: "$tips" } } },
			{ $match: { tipsLength: { $gte: 3 } } },
			{ $project: { tipsLength: 0 } },
			{ $sample: { size: 1 } },
		]);
		res.render("game", { gameWord: word[0] });
	} catch (err) {}
};
