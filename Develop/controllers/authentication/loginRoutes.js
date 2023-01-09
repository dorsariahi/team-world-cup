const express = require("express");
const router = express.Router();
const db = require("../../models");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/", (req, res) => {
	const { email, password } = req.body;

	// checks if there is a user with the provided email
	db.users
		.findOne({
			where: {
				email,
			},
		})
		.then((user) => {
			// If none, then whoops, returns an error message
			if (!user) {
				return res.status(400).json({ message: "Invalid email or password" });
			}

			// If a user is found, compares the provided password with the hashed password in the db
			bcrypt.compare(password, user.password).then((isMatch) => {
				// If the passwords match, sets a session variable to indicate that the user is logged in
				if (isMatch) {
					req.session.isLoggedIn = true;
					req.session.userId = user.id;
					return res.status(200).json({ message: "Successfully logged in" });
				} else {
					// If the passwords don't match, returns an error message
					return res.status(400).json({ message: "Invalid email or password" });
				}
			});
		});
});

module.exports = router;
