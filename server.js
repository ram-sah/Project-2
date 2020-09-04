// Requiring necessary npm packages
const express = require("express");
// const session = require("express-session");
// Requiring passport as we've configured it
// const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
// app.use(
//   session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());


// / Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get('/', function (req, res) {
//   res.render('index');
// });

var winesRoutes = require("./controllers/winesController.js");

// Requiring our routes
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/data-routes.js")(app);


app.use(winesRoutes);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});