const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const serveStatic = require("serve-static");

// Importing my models
const Games = require("./models/games");
const UserVotes = require("./models/user_votes");
const Users = require("./models/users");

//set handlebars as the view engine + set default layout to main.hbs (actually main.handlebars), like a boss
app.set("views", "./views");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Import our routes
const Routes = require("./controllers/index");

// Ensure we use the routes
app.use("/", Routes);

app.use(serveStatic("Develop/views/CSS"));

sequelize.sync().then(() => {
	app.listen(3001, () => {
		console.log("App listening on port 3001");
	});
});
