var express = require("express");
var router = express.Router();
const wordController = require("../controller/wordController");
const userController = require("../controller/userController");

/* GET home page. */
router.get("/", wordController.createNewWordGet);
router.post("/", wordController.createNewWordPost);

router.get("*", (req, res) => {
	res.redirect("/");
});
module.exports = router;
