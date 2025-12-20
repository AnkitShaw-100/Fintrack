import { useEffect, useState } from "react";
import API from "../api";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  // State for expenses and form
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

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
    "Other"
  ];

  // Start editing handler
  const startEditing = (exp) => {
    setEditingId(exp._id);
    setEditCategory(exp.category);
    setEditAmount(exp.amount);
    setEditDate(exp.date.split("T")[0]);
    setEditDescription(exp.description || "");
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      if (err && err.response) {
        setError(err.response?.data?.message || "Failed to fetch expenses");
      } else {
        setError("Failed to fetch expenses");
      }
    } finally {
      setLoading(false);
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

  // Update handler
  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const res = await API.put(`/api/expenses/${editingId}`, {
        category: editCategory,
        amount: editAmount,
        date: editDate,
        description: editDescription,
      });
      setExpenses(expenses.map(exp => exp._id === editingId ? res.data : exp));
      setEditingId(null);
    } catch (err) {
      if (err && err.response) {
        setError(err.response?.data?.message || "Failed to update expense");
      } else {
        setError("Failed to update expense");
      }
    }
  };

  // Delete handler
  const handleDeleteExpense = async () => {
    if (!expenseToDelete) return;
    try {
      await API.delete(`/api/expenses/${expenseToDelete}`);
      setExpenses(expenses.filter((exp) => exp._id !== expenseToDelete));
      setDeleteDialogOpen(false);
    } catch (err) {
      if (err && err.response) {
        setError(err.response?.data?.message || "Failed to delete expense");
      } else {
        setError("Failed to delete expense");
      }
    }
  };

  const openDeleteDialog = (id) => {
    setExpenseToDelete(id);
    setDeleteDialogOpen(true);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-2 py-6 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-600 text-center mb-6">Expense Dashboard</h1>

        {error && (
          <div className="mb-4">
            <div className="rounded-lg bg-green-100 text-green-600 px-4 py-3">{error}</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Add Expense Form */}
          <div className="col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg h-full">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">Add New Expense</h2>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
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
            <div className="rounded-2xl bg-white p-6 shadow-lg h-full">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">Expense Overview</h2>
              <ExpenseChart expenses={expenses} />
            </div>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">Your Expenses</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : expenses.length === 0 ? (
            <div className="rounded-lg bg-green-50 text-green-600 px-4 py-3">No expenses found. Add some to get started!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp._id} className="hover:bg-green-50">
                      {editingId === exp._id ? (
                        <>
                          <td className="px-4 py-2">
                            <select
                              className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              required
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                              value={editAmount || ""}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                              required
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="date"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              required
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              className="inline-block rounded-lg bg-green-600 text-white px-3 py-1 mr-2 font-medium shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                              onClick={handleUpdateExpense}
                              type="button"
                            >
                              Save
                            </button>
                            <button
                              className="inline-block rounded-lg bg-gray-300 text-gray-600 px-3 py-1 font-medium shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                              onClick={cancelEditing}
                              type="button"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2">{exp.category}</td>
                          <td className="px-4 py-2 text-right">₹{exp.amount.toFixed(2)}</td>
                          <td className="px-4 py-2">{new Date(exp.date).toLocaleDateString()}</td>
                          <td className="px-4 py-2">{exp.description || "-"}</td>
                          <td className="px-4 py-2 text-center">
                            <button
                              className="inline-block rounded-lg bg-green-600 text-white px-3 py-1 mr-2 font-medium shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                              onClick={() => startEditing(exp)}
                              type="button"
                            >
                              Edit
                            </button>
                            <button
                              className="inline-block rounded-lg bg-red-600 text-white px-3 py-1 font-medium shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                              onClick={() => openDeleteDialog(exp._id)}
                              type="button"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        {deleteDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
              <p className="mb-4">Are you sure you want to delete this expense?</p>
              <div className="flex justify-end gap-2">
                <button
                  className="rounded-lg bg-gray-300 text-gray-600 px-4 py-2 font-medium shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-red-600 text-white px-4 py-2 font-medium shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                  onClick={handleDeleteExpense}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
