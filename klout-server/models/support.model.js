const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", SupportSchema);

module.exports = Support;