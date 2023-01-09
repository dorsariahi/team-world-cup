const express = require("express");
const router = express.Router();

// Render the signup form template when a GET request is made to the /signup route
router.get("/signup", (req, res) => {
	res.render("signUp");
});

module.exports = router;
