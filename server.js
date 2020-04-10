//Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Handlebars
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3001;

// Init Express
var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Middleware

// Morgan for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var db = mongoose.connection;

// In case of mongoose errors
db.on("error", function(error) {
  console.warn("Mongoose Error: ", error);
});
// Otherwise log a success message
db.once("open", function() {
  console.info("Mongoose connection successful.");
});

//Routes
var routes = require("./controllers/routes.js");
app.use("/",routes);

// ================~~~SERVER~~~~==================----------|  |===|===||
// Start the server                                       //|  |  _√_  ||
app.listen(PORT, function() {                             //|  |<(¨v¨)>||
  console.log("App running at localhost:" + PORT + "/");  //|  |  |U|  ||
});                                                       //|  |_______||
// ================~~~SERVER~~~~==================----------|  ~~GOBLIN~~ 