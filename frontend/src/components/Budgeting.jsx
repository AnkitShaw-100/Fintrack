import React, { useState, useEffect } from "react";
import API from "../api";

const ACCENT = "#b5f277";

const Budgeting = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [budgetRes, expenseRes] = await Promise.all([
        API.get("/api/budgets"),
        API.get("/api/expenses"),
      ]);
      setBudgets(budgetRes.data || []);
      setExpenses(expenseRes.data || []);
    } catch (err) {
      if (err?.isAuthRedirect) return;
      setError("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!limit) {
      setError("Please provide limit");
      return;
    }

    try {
      await API.post("/api/budgets", {
        limit: Number(limit),
        period,
      });
      setLimit("");
      setPeriod("monthly");
      setShowForm(false);
      fetchData();
    } catch (err) {
      if (err?.isAuthRedirect) return;
      setError(err?.response?.data?.message || "Failed to create budget");
    }
  };

  const deleteBudget = async (id) => {
    try {
      await API.delete(`/api/budgets/${id}`);
      fetchData();
    } catch (err) {
      if (err?.isAuthRedirect) return;
      setError("Failed to delete budget");
    }
  };

  // Calculate total spending across all categories
  const getTotalSpending = () => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const getProgress = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    return Math.min(percentage, 100);
  };

  const getAlertLevel = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return "danger";
    if (percentage >= 80) return "warning";
    return "safe";
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <p className="text-gray-400">Loading budgets...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          Budgeting
        </h2>
      </div>

      {error && (
        <div className="mb-4 bg-red-900/20 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Add Budget Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2 bg-[#b5f277] text-[#07100a] rounded-lg font-semibold mb-4"
        >
          {showForm ? "Cancel" : "+ Create Budget"}
        </button>
      </div>

      {/* Budget Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0b0f12] p-6 rounded-2xl border border-[#111318] shadow-lg mb-8"
        >
          <h3 className="text-xl font-bold text-[#b5f277] mb-4 text-center">
            New Budget
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-base text-white font-semibold">
                Limit (₹)
              </label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="0.00"
                className="w-full mt-2 rounded-lg bg-[#23282c] px-3 py-2 text-white focus:ring-2 focus:ring-[#b5f277]"
              />
            </div>

            <div>
              <label className="text-base text-white font-semibold">
                Period
              </label>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full mt-2 rounded-lg bg-[#23282c] px-3 py-2 text-white"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-[#b5f277] text-[#07100a] rounded-md font-semibold hover:bg-[#d6ff8a] transition"
            >
              Save Budget
            </button>
          </div>
        </form>
      )}

      {/* Budget Cards */}
      {budgets.length === 0 ? (
        <div className="bg-[#0b0f12] p-8 rounded-lg border border-[#111318] text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            No Budgets Yet
          </h3>
          <p className="text-gray-400">
            Create your first budget to start tracking spending
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const spent = getTotalSpending();
            const progress = getProgress(spent, budget.limit);
            const alertLevel = getAlertLevel(spent, budget.limit);

            return (
              <div
                key={budget._id}
                className="bg-[#0b0f12] p-6 rounded-2xl border border-[#111318] shadow-lg hover:border-[#b5f277]/30 transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Overall Budget
                    </h3>
                    <p className="text-xs text-gray-400 uppercase">
                      {budget.period}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteBudget(budget._id)}
                    className="text-gray-400 hover:text-red-400 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Spending Info */}
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-2xl font-bold text-[#b5f277]">
                      ₹{spent.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400">
                      of ₹{budget.limit}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#1a1f23] rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${alertLevel === "danger"
                        ? "bg-red-500 "
                        : alertLevel === "warning"
                          ? "bg-orange-500"
                          : "bg-[#b5f277] "
                        }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Alert Message */}
                {alertLevel === "danger" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 px-3 py-2 rounded-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Budget exceeded!</span>
                  </div>
                )}

                {alertLevel === "warning" && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm bg-yellow-900/20 px-3 py-2 rounded-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Nearing limit (80%+)</span>
                  </div>
                )}

                {alertLevel === "safe" && (
                  <div className="flex items-center gap-2 text-[#b5f277] text-sm bg-[#b5f277]/10 px-3 py-2 rounded-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>On track</span>
                  </div>
                )}

                {/* Remaining */}
                <div className="mt-3 text-center text-sm text-gray-400">
                  <span className="text-white font-semibold">
                    ₹{Math.max(0, budget.limit - spent).toFixed(2)}
                  </span>{" "}
                  remaining
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Budgeting;
