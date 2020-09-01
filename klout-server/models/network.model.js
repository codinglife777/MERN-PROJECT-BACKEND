const mongoose = require("mongoose");

const NetworkSchema = new mongoose.Schema(
  {
    facebook: {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    twitter: {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    instagram: {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
  },
  { timestamps: true }
);

const Network = mongoose.model("Network", NetworkSchema);

module.exports = Network;