const express = require("express");
const router = express.Router();
const { application } = require("express");
const sequelize = require("../../config/connection");
const db = require("../models");

router.post("/api/votes", (req, res) => {
	const { gameId, userId, score } = req.body;
	db.user_votes
		.create({
			game_id: gameId,
			user_id: userId,
			score,
		})
		.then((vote) => {
			// OPTIONAL: sends the updated score for the game as a response if the vote was properly written to the db
			res.json({ score: vote.score });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

module.exports = router;
