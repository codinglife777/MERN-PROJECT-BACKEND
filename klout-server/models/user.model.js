const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    googleID: { type: String },
    image: {
      type: String,
      default:
        "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
