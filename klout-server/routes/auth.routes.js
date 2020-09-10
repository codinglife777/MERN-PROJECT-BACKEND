const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/user.model");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
     
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});


router.post("/signup", (req, res, next) => {
  
  const username = req.body.username;
  const password = req.body.password;

  console.log(username)

  
  if (!username || !password) {
    
    res
      .status(400)
      .json({ message: "Indicate username, password" });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad" });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass
    });
    
    aNewUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }
    });
    
    req.login(aNewUser, err => {
      if (err) {
        res.status(500).json({ message: "Login after signup went bad." });
        return;
      }
      res.status(200).json(aNewUser);
    });
  });
});


router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({message: "Logged out"});
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});
module.exports = router;