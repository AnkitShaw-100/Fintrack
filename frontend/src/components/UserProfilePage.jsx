import { useEffect, useMemo, useState } from "react";
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
  const [editAmount, setEditAmount] = useState();
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    const parts = user.name.trim().split(" ").filter(Boolean);
    const letters = parts
      .slice(0, 2)
      .map((p) => p[0])
      .join("");
    return letters.toUpperCase();
  }, [user?.name]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-3 sm:px-4 py-4 sm:py-6 pt-20 sm:pt-24">
      <div className="w-full max-w-5xl mx-auto space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-400">
              Account
            </p>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800">User Profile</h2>
          </div>
        </div>

        {/* Top grid: Profile + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-green-100 text-green-700 font-semibold text-sm sm:text-base">
                {initials}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                  Account Details
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">Manage your info</p>
              </div>
            </div>
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : user ? (
              <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base break-all">
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Name:</span>
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Email:</span>
                  <span className="font-semibold">{user.email}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No user data found.</div>
            )}

            <div className="mt-4 sm:mt-6">
              <button
                type="button"
                className="rounded-lg bg-green-600 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium text-white shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600">
                Expense Summary
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Last 10
              </span>
            </div>
            {expLoading ? (
              <div className="text-gray-500">Loading...</div>
            ) : expError ? (
              <div className="text-red-600">{expError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <SummaryCard
                  title="Total Expenses"
                  value={expenses.length}
                  accent="bg-green-100 text-green-700"
                />
                <SummaryCard
                  title="Total Spend"
                  value={`₹${expenses
                    .reduce((s, e) => s + e.amount, 0)
                    .toFixed(2)}`}
                  accent="bg-blue-100 text-blue-700"
                />
                <SummaryCard
                  title="Latest"
                  value={
                    expenses[0]
                      ? new Date(expenses[0].date).toLocaleDateString()
                      : "-"
                  }
                  accent="bg-amber-100 text-amber-700"
                />
              </div>
            )}
          </div>
        </div>

        {/* Expense History */}
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                History
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                Expense History
              </h3>
            </div>
            <span className="text-xs text-gray-400">All Expenses</span>
          </div>
          {expLoading ? (
            <div className="text-gray-500">Loading...</div>
          ) : expError ? (
            <div className="text-red-600">{expError}</div>
          ) : expenses.length === 0 ? (
            <div className="rounded-lg bg-green-50 text-green-600 px-4 py-3">
              No expenses found.
            </div>
          ) : (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gradient-to-r from-green-50 to-blue-50 sticky top-0">
                  <tr className="border-b-2 border-green-200">
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                      Description
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {expenses.slice(0, 10).map((exp, index) => (
                    <tr
                      key={exp._id}
                      className={`transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-green-50`}
                    >
                      {editingId === exp._id ? (
                        <>
                          <td className="px-6 py-3">
                            <input
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                            />
                          </td>
                          <td className="px-6 py-3 text-right">
                            <input
                              type="number"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              value={editAmount}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                            />
                          </td>
                          <td className="px-6 py-3">
                            <input
                              type="date"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                            />
                          </td>
                          <td className="px-6 py-3">
                            <input
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                            />
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="rounded-lg bg-green-500 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-150 flex items-center gap-1"
                                onClick={() => handleUpdate(exp._id)}
                              >
                                Save
                              </button>
                              <button
                                className="rounded-lg bg-gray-300 text-gray-700 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-400 hover:shadow-md transition-all duration-150 flex items-center gap-1"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-green-50 px-4 py-1.5 text-xs font-semibold text-green-800 border border-green-200">
                              {exp.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-bold text-gray-900 text-base">
                              ₹{exp.amount.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600 font-medium">
                              {new Date(exp.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-700">
                              {exp.description || (
                                <span className="text-gray-400 italic">
                                  No description
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="rounded-lg bg-blue-500 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-600 hover:shadow-md transition-all duration-150 flex items-center gap-1"
                                onClick={() => startEditing(exp)}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                className="rounded-lg bg-red-500 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-red-600 hover:shadow-md transition-all duration-150 flex items-center gap-1"
                                onClick={() => handleDelete(exp._id)}
                              >
                                <svg
                                  className="w-4 h-4"
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
                                Delete
                              </button>
                            </div>
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

function SummaryCard({ title, value, accent }) {
  return (
    <div className={`rounded-xl border border-gray-100 p-4 ${accent || ""}`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-xl font-bold text-gray-700">{value}</div>
    </div>
  );
}
