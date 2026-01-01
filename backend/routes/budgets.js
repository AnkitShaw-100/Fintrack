const express = require("express");
const Budget = require("../models/Budget");
const auth = require("../middlewares/auth");
const router = express.Router();

// Create budget
router.post("/", auth, async (req, res) => {
  try {
    const { limit, period } = req.body;

    if (!limit) {
      return res.status(400).json({ message: "Limit is required" });
    }

    // Check if budget already exists for this period
    const existingBudget = await Budget.findOne({
      userId: req.user.id,
      period: period || "monthly",
    });

    if (existingBudget) {
      return res.status(400).json({
        message:
          "Budget already exists for this period. Please update or delete the existing one.",
      });
    }

    const budget = new Budget({
      userId: req.user.id,
      limit,
      period: period || "monthly",
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all budgets for user
router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update budget
router.put("/:id", auth, async (req, res) => {
  try {
    const { limit, period } = req.body;

    let budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Ensure only the owner can update
    if (budget.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    budget.limit = limit || budget.limit;
    budget.period = period || budget.period;

    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete budget
router.delete("/:id", auth, async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
