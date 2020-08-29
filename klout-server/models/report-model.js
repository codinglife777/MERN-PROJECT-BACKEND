const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
    {
     
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      
    },
    { timestamps: true }
  );
  
  const Report = mongoose.model("Ranking", ReportSchema);
  
  module.exports = Report;