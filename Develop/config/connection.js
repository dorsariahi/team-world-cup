const Sequelize = require("sequelize");

let sequelize;

sequelize = new Sequelize("games_db", "root", "v3r1F1cat10n.", {
	host: "localhost",
	dialect: "mysql",
	port: 3306,
});

module.exports = sequelize;
