const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");
const cloudinary = require("../configs/cloudinary.config.js");
const UserController = require("../controllers/user-controller");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res.status(500).json({ message: `Something went wrong.` });
      return;
    }
    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        res.status(500).json({
          message: `Session not recorded correctly`,
        });
        return;
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const { username, name, email, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: `Provides user and password` });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({
      message: `Password must be at least 8 characters long`,
    });
    return;
  }
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Ok" });
});

/*router.get('/', (req, res, next) => {
  const { user } = req;
  res.render('home', { user });
});

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/logout', (req, res, next) => {
req.logout();
res.redirect('/');
});

router.get('/return', 
passport.authenticate('twitter', { failureRedirect: '/' }),
(req, res, next) => {
  res.redirect('/');
});*/

//router.get('/login/facebook', passport.authenticate('facebook'));

/*router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/return', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});/*

router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});*/

module.exports = router;
