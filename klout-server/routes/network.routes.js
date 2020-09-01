const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const NetworkController = require("../controllers/network.controller");

router.get("/network", async (req, res, next) => {
    try {
        const networks = await NetworkController.list();
        res.status(200).json(networks);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get("/network/:id", async (req, res, next) => {
    try {
        const network = await NetworkController.get(req.params.id);
        res.status(200).json(network);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post("/network", async (req, res, next) => {});

router.put("/network/:id", async (req, res, next) => {});

router.delete("/network/:id", async (req, res, next) => {});

module.exports = router;
