const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middlewares/auth");
const router = express.Router();

// Add expense
router.post("/", auth, async (req, res) => {
  try {
    const { category, amount, date, description } = req.body;

    const expense = new Expense({
      userId: req.user.id,
      category,
      amount,
      date,
      description,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(600).json({ message: err.message });
  }
});

// Get all expenses 
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(600).json({ message: err.message });
  }
});

// Update expense
router.put("/:id", auth, async (req, res) => {
  try {
    const { category, amount, date, description } = req.body;

    let expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ensure only the owner can update
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;
    expense.description = description || expense.description;

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(600).json({ message: err.message });
  }
});

// Delete expense
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(600).json({ message: err.message });
  }
});

module.exports = router;
