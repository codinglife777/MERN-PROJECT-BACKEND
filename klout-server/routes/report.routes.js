const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// include the model:
const Report = require("../models/report.model");

router.get("/", (req, res, next) => {
  Report.find()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => next(err));
});





router.get("/:id", (req, res, next) => {
  Report.findById(req.params.id)
    .then((report) => {
      res.json(report);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res, next) => {
  Report.create(req.body)
    .then((report) => {
      // console.log('Created new thing: ', aNewThing);
      res.status(200).json(report);
    })
    .catch((err) => next(err));
});




router.delete("/:id", (req, res, next) => {
  // to do
  //req.params.id
  res.status(200).json({ message: "DELETE aguardando implementacion. " });
});

router.patch("/:id", (req, res, next) => {
  // to do
  //req.params.id
  res.status(200).json({ message: "PATCH aguardando implementacion. " });
});

router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Report.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `report id ${req.params.id} updated successfully.` });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;