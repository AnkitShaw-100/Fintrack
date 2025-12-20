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
    <div className="min-h-screen bg-gray-100 px-2 py-4 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-600 text-center mb-4">
          Expense Dashboard
        </h1>

        {/* Overview cards */}
        <Overview expenses={expenses} />

        {error && (
          <div className="mb-4">
            <div className="rounded-lg bg-red-100 text-red-600 px-4 py-3">
              {error}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Add Expense Form */}
          <div className="col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg h-full">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">
                Add New Expense
              </h2>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 text-white font-semibold py-2 mt-2 shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                >
                  Add Expense
                </button>
              </form>
            </div>
          </div>

          {/* Expense Chart */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-lg h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-600">Expense Overview</h2>
              </div>
              <div className="flex-1">
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card
        title="Total Spend"
        value={`₹${total.toFixed(2)}`}
        subtitle="All time"
      />
      <Card
        title="This Month"
        value={`₹${currentMonthTotal.toFixed(2)}`}
        subtitle={`${now.toLocaleString("default", { month: "long" })}`}
      />
      <Card title="Top Category" value={topCategory} subtitle="Highest spend" />
    </div>
  );
}

function Card({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-bold text-gray-700">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
    </div>
  );
}
