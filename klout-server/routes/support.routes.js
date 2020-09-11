const express = require("express");
const router = express.Router();
const supportController = require("../controllers/support.controller");

router.get("/", async (req, res, next) => {
  const support = await supportController.listByUser(req.session.user._id);
  let supportCount = support.length;
  res.render("app/support/list", {
    layout: "app/layout",
    user: req.session.user,
    supportCount: supportCount,
    supports: support,
  });
});

router.get("/ticket", async (req, res, next) => {
  const support = await supportController.listByUser(req.session.user._id);
  let supportCount = support.length + 1;
  res.render("app/support/ticket", {
    layout: "app/layout",
    user: req.session.user,
    supportCount: supportCount,
    supports: support,
  });
});

router.post("/ticket", async (req, res, next) => {
  const status = "new";
  const user = req.session.user._id;
  const { name, username, subject, message } = req.body;
  try {
    await supportController.add({
      date: new Date(),
      user,
      name,
      username,
      subject,
      message,
      status,
    });

    res.redirect("/app/support");
  } catch (err) {
    console.log(err);
    res.render("app/ticket", {
      layout: "app/layout",
      date,
      user: req.session.user,
      name,
      username,
      subject,
      message,
      status,
      errorMessage: err.message,
    });
  }
});

module.exports = router;
