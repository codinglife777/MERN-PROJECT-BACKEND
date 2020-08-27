const UserController = require("../controllers/user.controller");
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
            message: "User not found.",
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          next(null, false, {
            message: `Password not found`,
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
