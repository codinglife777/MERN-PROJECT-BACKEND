const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const cloudinary = require("../configs/cloudinary.config.js");

router.get("/", async (req, res, next) => {
  try {
    const users = await UserController.list();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserController.get(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", cloudinary.single("Avatar"), async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      _id: req.user._id,
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
    };
    let foundUser = await UserController.checkUsernameUser(
      user.username,
      user._id
    );
    if (foundUser) {
      res.status(400).json({ message: "Existing user. Use another." });
      return;
    } else {
      foundUser = await UserController.checkEmailtUser(user.email, user._id);
      if (foundUser) {
        res.status(400).json({ message: "Existing mail. Use another." });
        return;
      } else {
        try {
          if (req.file) {
            user["image"] = req.file.path;
          }
          const editUser = await UserController.set(user);

          res.status(200).json(editUser);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    }
  } else {
    res.status(500).json({ message: "You are not authenticated" });
  }
});
module.exports = router;
