const express = require("express");
const passport = require("passport");
const router = express.Router();
const uploadCloud = require("../configs/cloudinary.config");
const UserController = require("../controllers/user.controller");
const bcrypt = require("bcryptjs");

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
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(406)
      .json({ message: `Provide username and password` });
    return;
  }
  
  if (password.length < 8) {
    res.status(406).json({
      message: `Password must be at least 8 characters long`,
    });
    return;
  }
  let foundUser = await UserController.checkUsername(username);
  if (foundUser) {
    res.status(406).json({ message: "Existing user. Use another." });
    return;
  }  else {
      try {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await UserController.add(
          username,
          hashPass
        );
        req.login(newUser, (err) => {
          if (err) {
            res.status(500).json({
              message: "Authentification after registration did not work properly",
            });
            return;
          }
          res.status(200).json(newUser);
        });
      } catch (err) {
        res.status(500).json({
          message: "The discharge did not work properly. Please try again in a few minutes",
        });
        return;
      }
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out" });
});

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.post('/checkusername', async (req, res, next) => {
	try {
		const exist = await UserController.checkUsername(req.body.username);

		if (exist) {
			res.status(200).json(exist);
		} else {
			res.status(404).json({ message: 'User available' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
