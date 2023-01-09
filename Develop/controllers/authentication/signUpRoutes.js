const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // hash them passwords bruh
const { check, validationResult } = require("express-validator");
const db = require("/team-world-cup/Develop/models");

// Render the signup form template when a GET request is made to the /signup route
router.get("/signup", (req, res) => {
	res.render("signUp");
});

//POST request to hanlde the signup form submission
router.post(
	"/",
	// Validate the form data
	[
		check("name").not().isEmpty().withMessage("Name is required"),
		check("email").isEmail().withMessage("Invalid email"),
		check("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
	],
	(req, res) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		// Get form data
		const { name, email, password } = req.body;

		// Hash that password bruh
		bcrypt.hash(password, 10, (err, hashedPassword) => {
			if (err) {
				return res.status(500).json({ message: "Error hashing password" });
			}

			// Create new user in the database
			db.users
				.create({
					name,
					email,
					password: hashedPassword,
				})
				.then((user) => {
					// Redirect to login page
					res.redirect("/login");
				})
				.catch((err) => {
					res.status(500).json({ message: err.message });
				});
		});
	}
);

module.exports = router;
