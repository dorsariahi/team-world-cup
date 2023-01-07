const express = require("express");
const apiRouter = express.Router();
const { application } = require("express");
const sequelize = require("../../config/connection");

apiRouter.get("/api/games", (req, res) => {
	getGames();
});

async function getGames() {
	//query the DB for all games
	const games = await sequelize.query(
		`SELECT games.id, games.name, SUM(user_votes.score) AS score_sum
    FROM games
    LEFT JOIN user_votes ON games.id = user_votes.game_id
    GROUP BY games.id, games.name`,
		{ type: sequelize.QueryTypes.SELECT }
	);

	console.log(games);
}

module.exports = apiRouter;
