const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema(
  {
    facebook: {
      folowers: { type: Number, required: true },
      likes: { type: String, required: true },
      comments: { type: String, required: true },
      shares: { type: String, required: true },
    },
    twitter: {
      folowers: { type: Number, required: true },
      likes: { type: String, required: true },
      comments: { type: String, required: true },
      retweets: { type: String, required: true },
    },
    instagram: {
      folowers: { type: Number, required: true },
      likes: { type: String, required: true },
      comments: { type: String, required: true },
      shares: { type: String, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Ranking = mongoose.model("Ranking", RankingSchema);

module.exports = Ranking;
