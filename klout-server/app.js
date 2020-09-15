require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
/*const session = require('express-session')
const socketio = require('socket.io')
const authRouter = require('./configs/auth.router')
const passportInit = require('./configs/passport.init')*/
/*const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config')*/

const app = express();

/*const certOptions = {
  key: fs.readFileSync(path.resolve('certs/server.key')),
  cert: fs.readFileSync(path.resolve('certs/server.crt'))
}*/

/*const server = https.createServer(certOptions, app)*/

// Setup for passport and to accept JSON objects
/*app.use(express.json())
app.use(passport.initialize())*/
/*passportInit()*/

// Accept requests from the client
/*app.use(cors({
  origin: CLIENT_ORIGIN
})) */

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
/*app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true 
}))*/

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
/*const io = socketio(server)
app.set('io', io)*/

// Direct all requests to the auth router
/*app.use('/', authRouter)

server.listen(process.env.PORT || 8080, () => {
  console.log('listening...')
})*/

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
app.use(favicon(path.join(__dirname, "public", "images", "klout1.png")));

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3002",
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:5000",
      "https://klout.herokuapp.com/",
      "https://klout.herokuapp.com/api/",
    ], // <== aceptar llamadas desde este dominio
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

const userID = require("./routes/user.routes");
app.use("/api/user/:id", user);

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

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(path.join(__dirname, "build")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
module.exports = app;
