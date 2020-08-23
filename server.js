// Libraries
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

const passport = require("passport");
const users = require("./routes/api/users");
const categories = require("./routes/api/category");
const products = require("./routes/api/product");

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

const mongoose = require("mongoose");
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// static path for photos
//app.use("/uploads/", express.static(__dirname + "/uploads/"));

// DB Config
const db = require("./config/keys").mongoURI;

// Connection
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database has been connected successfully."))
  .catch((err) => console.log(err));

// Main routes

// Routes
app.use("/api/users", users);
app.use("/api/category", categories);
app.use("/api/product", products);

// Listening server port
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
