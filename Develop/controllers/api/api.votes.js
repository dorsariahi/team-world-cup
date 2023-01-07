const express = require("express");
const apiRouter = express.Router();
const { application } = require("express");
const sequelize = require("../../config/connection");

apiRouter.get("/api/games", (req, res) => {
	getGames();
});
