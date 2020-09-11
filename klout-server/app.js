require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

const app = express();

require("dayjs/locale/es");
require("./configs/db.config");
require("./configs/passport.config");
require("./configs/session.config")(app);

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

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

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001", "http://localhost:3000","http://localhost:5000"], // <== aceptar llamadas desde este dominio
  })
);

// default value for title local
app.locals.title = "Klout, Measure your influence on social media ";

//app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const index = require("./routes/index");
app.use("/", index);

const user = require("./routes/user.routes");
app.use("/api/user", user);

const auth = require("./routes/auth.routes");
app.use("/api/auth", auth);

const reports = require("./routes/report.routes");
app.use("/api/report", reports);

/*const network = require("./routes/network.routes");
app.use("/api", network);

const support = require("./routes/support.routes");
app.use("/api", support);

const log = require("./routes/log.routes");
app.use("/api", log);*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("ERROR EN APP");
});

module.exports = app;
