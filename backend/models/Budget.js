const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    limit: { 
      type: Number, 
      required: true 
    },
    period: { 
      type: String, 
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly" 
    },
  },
  { timestamps: true }
);

// Ensure unique period per user (one budget per period type)
budgetSchema.index({ userId: 1, period: 1 }, { unique: true });

module.exports = mongoose.model("Budget", budgetSchema);
