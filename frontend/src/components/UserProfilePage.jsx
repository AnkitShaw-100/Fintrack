import { useEffect, useState } from "react";
import API from "../api";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expLoading, setExpLoading] = useState(true);
  const [expError, setExpError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEditing = (exp) => {
    setEditingId(exp._id);
    setEditCategory(exp.category);
    setEditAmount(exp.amount);
    setEditDate(exp.date.split("T")[0]);
    setEditDescription(exp.description || "");
  };

  const handleUpdate = async (id) => {
    try {
      const res = await API.put(`/api/expenses/${id}`, {
        category: editCategory,
        amount: editAmount,
        date: editDate,
        description: editDescription,
      });
      setExpenses((prev) => prev.map((e) => (e._id === id ? res.data : e)));
      setEditingId(null);
    } catch (err) {
      setExpError(err?.response?.data?.message || "Failed to update expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setExpError(err?.response?.data?.message || "Failed to delete expense");
    }
  };

    const fetchUser = async () => {
      const token = localStorage.getItem("fintrack_token");
      if (!token) {
        setError("Please log in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/api/user/profile");
        setUser(res.data.user);
      } catch (err) {
        if (err?.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch user profile");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchExpenses = async () => {
      const token = localStorage.getItem("fintrack_token");
      if (!token) {
        setExpError("Please log in to view expenses.");
        setExpLoading(false);
        return;
      }

      try {
        const res = await API.get("/api/expenses");
        setExpenses(res.data || []);
      } catch (err) {
        setExpError(err?.response?.data?.message || "Failed to fetch expenses");
      } finally {
        setExpLoading(false);
      }
    };

  useEffect(() => {
    fetchUser();
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">User Profile</h2>

        {/* Top grid: Profile + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">Account Details</h3>
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : user ? (
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold">Name:</span> {user.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {user.email}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No user data found.</div>
            )}

            <div className="mt-6">
              <button
                type="button"
                className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">Expense Summary</h3>
            {expLoading ? (
              <div className="text-gray-500">Loading...</div>
            ) : expError ? (
              <div className="text-red-600">{expError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard title="Total Expenses" value={expenses.length} />
                <SummaryCard title="Total Spend" value={`₹${expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}`} />
                <SummaryCard title="Latest" value={expenses[0] ? new Date(expenses[0].date).toLocaleDateString() : "-"} />
              </div>
            )}
          </div>
        </div>

        {/* Expense History */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Expense History</h3>
          {expLoading ? (
            <div className="text-gray-500">Loading...</div>
          ) : expError ? (
            <div className="text-red-600">{expError}</div>
          ) : expenses.length === 0 ? (
            <div className="rounded-lg bg-green-50 text-green-600 px-4 py-3">No expenses found.</div>
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
                  {expenses.slice(0, 10).map((exp) => (
                    <tr key={exp._id} className="hover:bg-green-50">
                      {editingId === exp._id ? (
                        <>
                          <td className="px-4 py-2">
                            <input
                              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-2 text-right">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-full rounded border border-gray-300 px-2 py-1 text-sm text-right"
                              value={editAmount}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="date"
                              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-2 text-center space-x-2">
                            <button
                              className="rounded bg-green-600 text-white px-3 py-1 text-sm font-medium hover:bg-green-700"
                              onClick={() => handleUpdate(exp._id)}
                            >
                              Save
                            </button>
                            <button
                              className="rounded bg-gray-200 text-gray-700 px-3 py-1 text-sm font-medium hover:bg-gray-300"
                              onClick={() => setEditingId(null)}
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
                          <td className="px-4 py-2 text-center space-x-2">
                            <button
                              className="rounded bg-blue-600 text-white px-3 py-1 text-sm font-medium hover:bg-blue-700"
                              onClick={() => startEditing(exp)}
                            >
                              Edit
                            </button>
                            <button
                              className="rounded bg-red-600 text-white px-3 py-1 text-sm font-medium hover:bg-red-700"
                              onClick={() => handleDelete(exp._id)}
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
      </div>
    </div>
  );
};

export default UserProfilePage;

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-xl font-bold text-gray-700">{value}</div>
    </div>
  );
}
