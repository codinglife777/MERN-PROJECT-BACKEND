const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
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
