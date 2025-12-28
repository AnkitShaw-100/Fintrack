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
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f12] to-[#1a1f23] px-2 sm:px-3 py-3 sm:py-5 pt-16 sm:pt-20">
      <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-[#b5f277] font-semibold">Account</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow">User Profile</h2>
          </div>
        </div>

        {/* Top grid: Profile + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-7 shadow-2xl border border-[#222b2e]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b5f277] text-[#0b0f12] font-extrabold text-lg shadow-lg border-2 border-[#b5f277]">
                {initials}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Account Details</h3>
                <p className="text-xs sm:text-sm text-[#b5f277]">Manage your info</p>
              </div>
            </div>
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : error ? (
              <div className="text-red-400">{error}</div>
            ) : user ? (
              <div className="space-y-2 text-[#e6f7d6] text-sm sm:text-base break-all">
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-[#b5f277] whitespace-nowrap">Name:</span>
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-[#b5f277] whitespace-nowrap">Email:</span>
                  <span className="font-semibold">{user.email}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">No user data found.</div>
            )}

            <div className="mt-5">
              <button
                type="button"
                className="rounded-lg bg-[#b5f277] px-4 py-2 text-sm font-bold text-[#0b0f12] shadow-lg transition hover:bg-[#d6ff8a] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:ring-offset-2"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-7 shadow-2xl border border-[#222b2e]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-bold text-[#b5f277]">Expense Summary</h3>
            </div>
            {expLoading ? (
              <div className="text-gray-400">Loading...</div>
            ) : expError ? (
              <div className="text-red-400">{expError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <SummaryCard
                  title="Total Expenses"
                  value={expenses.length}
                  accent="bg-[#b5f277]/20 text-[#b5f277] border-[#b5f277]/30"
                />
                <SummaryCard
                  title="Total Spend"
                  value={`₹${expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}`}
                  accent="bg-[#7fffd4]/20 text-[#7fffd4] border-[#7fffd4]/30"
                />
                <SummaryCard
                  title="Latest"
                  value={expenses[0] ? new Date(expenses[0].date).toLocaleDateString() : "-"}
                  accent="bg-[#ffe066]/20 text-[#ffe066] border-[#ffe066]/30"
                />
              </div>
            )}
          </div>
        </div>

        {/* Expense History */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-7 shadow-2xl border border-[#222b2e]">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#b5f277] font-semibold">History</p>
              <h3 className="text-lg font-bold text-white">Expense History</h3>
            </div>
            <span className="text-xs text-[#b5f277]">All Expenses</span>
          </div>
          {expLoading ? (
            <div className="text-gray-400">Loading...</div>
          ) : expError ? (
            <div className="text-red-400">{expError}</div>
          ) : expenses.length === 0 ? (
            <div className="rounded-lg bg-[#b5f277]/10 text-[#b5f277] px-3 py-2">No expenses found.</div>
          ) : (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gradient-to-r from-[#b5f277]/20 to-[#7fffd4]/10 sticky top-0">
                  <tr className="border-b-2 border-[#b5f277]/30">
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-[#b5f277] uppercase tracking-wider">Category</th>
                    <th className="px-2 sm:px-4 py-2 text-right text-xs font-bold text-[#b5f277] uppercase tracking-wider">Amount</th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-[#b5f277] uppercase tracking-wider">Date</th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-[#b5f277] uppercase tracking-wider hidden sm:table-cell">Description</th>
                    <th className="px-2 sm:px-4 py-2 text-center text-xs font-bold text-[#b5f277] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#b5f277]/10">
                  {expenses.slice(0, 10).map((exp, index) => (
                    <tr
                      key={exp._id}
                      className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white/0" : "bg-[#b5f277]/[0.03]"} hover:bg-[#b5f277]/10`}
                    >
                      {editingId === exp._id ? (
                        <>
                          <td className="px-2 sm:px-4 py-2">
                            <input
                              className="w-full rounded border border-[#b5f277]/40 bg-[#0b0f12] text-[#b5f277] px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-transparent"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                            />
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-right">
                            <input
                              type="number"
                              className="w-full rounded border border-[#b5f277]/40 bg-[#0b0f12] text-[#b5f277] px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-transparent"
                              value={editAmount}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                            />
                          </td>
                          <td className="px-2 sm:px-4 py-2">
                            <input
                              type="date"
                              className="w-full rounded border border-[#b5f277]/40 bg-[#0b0f12] text-[#b5f277] px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-transparent"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                            />
                          </td>
                          <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                            <input
                              className="w-full rounded border border-[#b5f277]/40 bg-[#0b0f12] text-[#b5f277] px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:border-transparent"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                            />
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-center">
                            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                              <button
                                className="rounded bg-[#b5f277] text-[#0b0f12] px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold shadow-sm hover:bg-[#d6ff8a] transition-all"
                                onClick={() => handleUpdate(exp._id)}
                              >
                                Save
                              </button>
                              <button
                                className="rounded bg-[#222b2e] text-[#b5f277] px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold shadow-sm hover:bg-[#333] transition-all"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-2 sm:px-4 py-2">
                            <span className="inline-flex items-center rounded-full bg-[#b5f277]/20 px-2 sm:px-3 py-1 text-xs font-semibold text-[#b5f277] border border-[#b5f277]/30 whitespace-nowrap">
                              {exp.category}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-right">
                            <span className="font-bold text-[#b5f277] text-xs sm:text-base whitespace-nowrap">
                              ₹{exp.amount.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2">
                            <span className="text-[#e6f7d6] font-medium text-xs sm:text-sm">
                              {new Date(exp.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                            <span className="text-[#e6f7d6] text-xs sm:text-sm line-clamp-2">
                              {exp.description || (
                                <span className="text-[#b5f277]/60 italic">-</span>
                              )}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-center">
                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                              <button
                                className="rounded bg-[#7fffd4] text-[#0b0f12] px-2 py-1 text-xs sm:text-sm font-bold shadow-sm hover:bg-[#b5f277] hover:text-[#0b0f12] transition-all flex items-center gap-0.5 sm:gap-1"
                                onClick={() => startEditing(exp)}
                              >
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                                <span className="hidden sm:inline">Edit</span>
                              </button>
                              <button
                                className="rounded bg-[#ff6b6b] text-white px-2 py-1 text-xs sm:text-sm font-bold shadow-sm hover:bg-[#ff8787] transition-all flex items-center gap-0.5 sm:gap-1"
                                onClick={() => handleDelete(exp._id)}
                              >
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                                <span className="hidden sm:inline">Delete</span>
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
    <div className={`rounded-xl border p-4 ${accent || ""} shadow-md`}>
      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">{title}</div>
      <div className="text-xl sm:text-2xl font-extrabold break-words">{value}</div>
    </div>
  );
}
