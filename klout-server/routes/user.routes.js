const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const uploadCloud = require("../configs/cloudinary.config.js");

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

router.post("/", uploadCloud.single("photo"), async (req, res, next) => {
  let { name, email, password, image } = req.body;

  try {
    /*if (req.file) {
      imgPath = req.file.path;
      imgName = req.file.originalname;
    } else {
      imgPath = req.session.user.imgPath;
      imgName = req.session.user.imgName;
    }*/
    await validateSignup(name, email, password);
    const passwordHash = await bcrypt.hashSync(password, saltRounds);
    //await Auth.signUp(name, email, passwordHash);
    //if (req.session.user.passwordHash == passwordHash) {
    req.session.user = await UserController.set({
      _id: req.session.user._id,
      name,
      email,
      passwordHash,
      image,
    });

    res.redirect("");
    //} else {
    //  throw new Error("Password incorrect. Try again.");
    //}
  } catch (err) {
    res.render("app/user", {
      layout: "app/layout",
      name,
      email,
      password,
      image,
    });
  }
});

router.put("/", uploadCloud.single("Avatar"), async (req, res, next) => {
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
