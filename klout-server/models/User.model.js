const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    image: {
      type: String,
      default:
        "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
