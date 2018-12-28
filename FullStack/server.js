require("dotenv").config({ path: __dirname + "/.env" }); //Initialize enviromental variables.
const express = require("express");
const mongoos = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const keys = require("./config/keys");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Check if the enviromental variables are initialized.
if (!keys.secretKey) process.exit(1);

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = keys.mongoURI;
//Connect to mongoDB
mongoos
  .connect(db)
  .then(() => console.log("MongoDB connected to ", db))
  .catch(err => console.log(err));

//Passport midleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Server running on port ${port}`));
