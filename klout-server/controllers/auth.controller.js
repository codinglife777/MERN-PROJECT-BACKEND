const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require("../models/user.model");

const postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Please provide username and password" });
    return;
  }

  if (password.length < 7) {
    res
      .status(400)
      .json({
        message:
          "Please make your password at least 8 characters long for security purposes.",
      });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Please choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass,
    });

    aNewUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
};

const postLogout = (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
};

const getLoggedIn = (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
};

const putEditProfilePicture = async (req, res, next) => {
  let profilePicture = req.body.profilePicture
  if (req.file) {
    profilePicture = req.file.path
  }
  if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    await User.findByIdAndUpdate(req.user._id, { profilePicture: profilePicture })
    res.json({ message: `User with ${req.user._id} is updated successfully.` })
  } catch(error) {
    res.json(error)
  }
}



module.exports = {
  postSignup,
  postLogin,
  postLogout,
  getLoggedIn,
  putEditProfilePicture,
 
};