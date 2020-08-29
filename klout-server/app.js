require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

const { Strategy } = require("passport-twitter");
const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  SESSION_SECRET,
} = process.env;

const { Strategy } = require("passport-facebook");
const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  SESSION_SECRET,
} = process.env;

const { Strategy } = require("passport-google-oauth20");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } = process.env;
const app = express();

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

require("./configs/db.config");
require("./configs/passport.config");
require("./configs/session.config")(app);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: ["*"], // <== Calls for this domain
  })
);

// default value for title local
app.locals.title = "Klout, Measure your influence on social media ";

const index = require("./routes/index");
app.use("/", index);

const user = require("./routes/user-routes");
app.use("/api", user);

const auth = require("./routes/auth-routes");
app.use("/api", auth);

module.exports = app;
