const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema(
    {
     
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      
    },
    { timestamps: true }
  );
  
  const Ranking = mongoose.model("Ranking", RankingSchema);
  
  module.exports = Ranking;