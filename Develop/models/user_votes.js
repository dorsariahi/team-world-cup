const Sequelize = require("sequelize");
const Games = require("./games");
const Users = require("./users");

//get connection set up
const connection = require("../config/connection");

// UserVotes model
const UserVotes = connection.define("user_votes", {
	game_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		references: {
			model: Games,
			key: "id",
		},
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		references: {
			model: Users,
			key: "id",
		},
	},
	game: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	score: {
		type: Sequelize.TINYINT,
		allowNull: false,
		validate: {
			isIn: [[-1, 1]],
		},
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
});

module.exports = UserVotes;
