const express = require("express");
const app = express();
const appRoutes = require("./routes")
const logger = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
//if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
//}

app.use(logger("dev"));
app.use(appRoutes)

// Database configuration for mongoose
// db: newsscrape

const local_db = "mongodb://localhost/scavengeorhunt"

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || local_db,
  {
    useMongoClient: true
  }
);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
