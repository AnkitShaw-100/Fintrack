import { useEffect, useState } from "react";
import API from "../api";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  // State for expenses and form
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Categories for dropdown
  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Education",
    "Shopping",
    "Other",
  ];

  // Fetch expenses
  const fetchExpenses = async () => {
    const token = localStorage.getItem("fintrack_token");
    if (!token) {
      setError("Please log in to view expenses.");
      return;
    }
    try {
      const res = await API.get("/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      if (err && err.response) {
        setError(err.response?.data?.message || "Failed to fetch expenses");
      } else {
        setError("Failed to fetch expenses");
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/expenses", { category, amount, date, description });
      setCategory("");
      setAmount(0);
      setDate("");
      setDescription("");
      fetchExpenses();
    } catch (err) {
      if (err && err.response) {
        setError(err.response?.data?.message || "Failed to add expense");
      } else {
        setError("Failed to add expense");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1112] text-gray-200 px-4 py-10 flex flex-col items-center pt-24">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-2">
          <div>
            <p className="text-sm uppercase tracking-wide text-[#b5f277]">
              Dashboard
            </p>
            <h1 className="text-4xl font-extrabold text-white">
              Expense Overview
            </h1>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Overview cards */}
        <Overview expenses={expenses} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add Expense Form */}
          <div className="md:col-span-1">
            <div className="rounded-2xl bg-[#181f23] p-8 shadow-xl border border-[#23282c] h-full">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wide text-[#b5f277]">
                  Form
                </p>
                <h2 className="text-2xl font-bold text-white">Add Expense</h2>
              </div>
              <form onSubmit={handleAddExpense} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#b5f277] mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full rounded-lg border border-[#23282c] bg-[#0d1112] px-3 py-2 text-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-[#b5f277] transition"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b5f277] mb-2">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full rounded-lg border border-[#23282c] bg-[#0d1112] px-3 py-2 text-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-[#b5f277] transition"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b5f277] mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-[#23282c] bg-[#0d1112] px-3 py-2 text-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-[#b5f277] transition"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b5f277] mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-[#23282c] bg-[#0d1112] px-3 py-2 text-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-[#b5f277] transition"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Optional notes about this expense"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#b5f277] text-[#07100a] font-semibold py-2.5 shadow-md transition hover:bg-[#a0e05e] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:ring-offset-2"
                >
                  Add Expense
                </button>
              </form>
            </div>
          </div>

          {/* Expense Chart */}
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-[#181f23] p-8 shadow-xl border border-[#23282c] h-full flex flex-col">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wide text-[#b5f277]">
                  Analytics
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Spending Breakdown
                </h2>
              </div>
              <div className="flex-1 min-h-80">
                <ExpenseChart expenses={expenses} heightClass="h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function Overview({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const now = new Date();
  const currentMonthTotal = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const topCategory =
    Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const categoryCount = Object.keys(byCategory).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card
        title="Total Spend"
        value={`₹${total.toFixed(2)}`}
        subtitle="All time"
        accent="bg-[#23282c] text-[#b5f277] border border-[#23282c]"
      />
      <Card
        title="This Month"
        value={`₹${currentMonthTotal.toFixed(2)}`}
        subtitle={now.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
        accent="bg-[#23282c] text-[#b5f277] border border-[#23282c]"
      />
      <Card
        title="Top Category"
        value={topCategory}
        subtitle="Highest spend"
        accent="bg-[#23282c] text-[#b5f277] border border-[#23282c]"
      />
      <Card
        title="Categories"
        value={categoryCount}
        subtitle="Tracked"
        accent="bg-[#23282c] text-[#b5f277] border border-[#23282c]"
      />
    </div>
  );
}

function Card({ title, value, subtitle, accent }) {
  return (
    <div
      className={`rounded-xl p-6 shadow-md hover:shadow-lg transition ${
        accent || ""
      }`}
    >
      <div className="text-sm font-medium text-[#b5f277]">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
    </div>
  );
}
