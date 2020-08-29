const express = require("express");
const router = express.Router();
const LogController = require("../controllers/log.controller");

/* GET home page */
router.get("/", async (req, res, next) => {
  const logRegistry = await LogController.listByUser(req.session.user._id);
  res.render("app/logs/index", {
    layout: "app/layout",
    user: req.session.user,
    logs: logRegistry,
  });
});

module.exports = router;
