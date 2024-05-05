const User = require("../model/user");

exports.createUserPost = async (req, res) => {
	console.log(req.body);
	let user = new User({
		username: req.body.username.toLowerCase(),
		originalUsername: req.body.username,
		password: req.body.password,
		initials:
			req.body.username[0].toUpperCase() + req.body.username[1].toUpperCase(),
	});

	try {
		await user.save();
		res.status(200).send("success");
	} catch (err) {
		res.status(500).send(err);
	}
};
