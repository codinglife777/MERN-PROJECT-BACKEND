const UserController = require("../controllers/user-controller");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs"); // !!!
const passport = require("passport");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  UserController.get(userIdFromSession)
    .then((userDocument) => cb(null, userDocument))
    .catch((err) => cb(err));
});

passport.use(
  new LocalStrategy((username, password, next) => {
    console.log(username, password);
    UserController.findByUsername(username)
      .then((foundUser) => {
        if (!foundUser) {
          next(null, false, {
            message: "Incorrect username.",
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          next(null, false, {
            message: `Incorrect password.`,
          });
          return;
        }

        next(null, foundUser);
      })
      .catch((err) => {
        next(err);
        return;
      });
  })
);

/*passport.use(new Strategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: '/return'
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});*/

/*passport.use(new Strategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/return'
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});*/

/*passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/return'
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});*/
