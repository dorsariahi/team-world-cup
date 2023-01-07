//Master function to run when hitting /api/games route, upon page load
//queries the DB for all games and returns them to the client as well as the score/rank from the 'user_votes' table.

const express = require("express");
const router = express.Router();
const apiRouter = require("./api/api.games");
const { application } = require("express");
const sequelize = require("sequelize");

router.use("/", apiRouter);

router.get("/", (req, res) => {
	res.send("Landing Page");
});

module.exports = router;
