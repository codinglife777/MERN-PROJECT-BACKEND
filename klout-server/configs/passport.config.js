const UserController = require("../controllers/user.controller");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      console.log("Passport is authenticating with Locla Strategy");

      UserController.findByUsername(username)
        .then((foundUser) => {
          if (!foundUser) {
            next(null, false, {
              message: "Usuari incorrecte.",
            });
            return;
          }

          if (!bcrypt.compareSync(password, foundUser.password)) {
            next(null, false, {
              message: `Clau d'acccés incorrecte`,
            });
            return;
          }

          next(null, foundUser);
        })
        .catch((err) => {
          next(err);
          return;
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      // console.log('Google account details:', profile);

      UserController.findByGoogleID(profile.id)
        .then((foundUser) => {
          if (foundUser) {
            done(null, foundUser);
            return;
          }

          UserController.findByEmail(profile.emails[0].value).then(
            (emailUser) => {
              if (emailUser) {
                emailUser["googleID"] = profile.id;
                UserController.set(emailUser).then((editUser) => {
                  done(null, editUser);
                  return;
                });
              } else {
                UserController.add(
                  profile.emails[0].value,
                  profile.displayName,
                  profile.emails[0].value,
                  null,
                  profile.id
                )
                  .then((newUser) => {
                    if (profile.photos && profile.photos[0]) {
                      UserController.setImage(
                        newUser._id,
                        profile.photos[0].value
                      ).then((imageUser) => {
                        done(null, imageUser);
                        return;
                      });
                    } else {
                      done(null, newUser);
                      return;
                    }
                  })
                  .catch((err) => done(err));
              }
            }
          );
        })
        .catch((err) => {
          done(err);
          return;
        });
    }
  )
);
