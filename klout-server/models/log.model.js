const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
