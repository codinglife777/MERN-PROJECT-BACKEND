const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");
const uploadCloud = require("../configs/cloudinary.config");
const UserController = require("../controllers/user.controller");

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
  if (password.length < 7) {
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

module.exports = router;
