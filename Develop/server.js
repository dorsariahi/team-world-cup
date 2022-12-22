const express = require("express");
const exphbs = require("express-handlebars");
const Sequelize = require("sequelize");

const app = express();

const sequelize = new Sequelize("vrgr_db", "user", "password", {
	host: "localhost",
	dialect: "mysql",
});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
	res.render("home");
});

sequelize.sync().then(() => {
	app.listen(3001, () => {
		console.log("App listening on port 3001");
	});
});
