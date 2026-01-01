import { useEffect, useMemo, useState } from "react";
import API from "../api";

const ACCENT = "#b5f277";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [expLoading, setExpLoading] = useState(true);
  const [expError, setExpError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [user?.name]);

  // Sort expenses by date (latest first) and paginate
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);
  const paginatedExpenses = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return sortedExpenses.slice(startIdx, startIdx + itemsPerPage);
  }, [sortedExpenses, currentPage]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/user/profile");
        setUser(res.data.user);
      } catch {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    const fetchExpenses = async () => {
      try {
        const res = await API.get("/api/expenses");
        setExpenses(res.data || []);
      } catch {
        setExpError("Failed to fetch expenses");
      } finally {
        setExpLoading(false);
      }
    };

    fetchUser();
    fetchExpenses();
  }, []);

  const startEdit = (e) => {
    setEditingId(e._id);
    setEditCategory(e.category);
    setEditAmount(e.amount);
    setEditDate(e.date?.slice(0, 10));
    setEditDescription(e.description || "");
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id) => {
    try {
      await API.put(`/api/expenses/${id}`, {
        category: editCategory,
        amount: Number(editAmount),
        date: editDate,
        description: editDescription,
      });

      setExpenses((prev) =>
        prev.map((e) =>
          e._id === id
            ? { ...e, category: editCategory, amount: editAmount, date: editDate, description: editDescription }
            : e
        )
      );
      setEditingId(null);
    } catch {
      alert("Failed to update expense");
    }
  };

  const openDeleteModal = (id) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await API.delete(`/api/expenses/${deleteTargetId}`);
      setExpenses((prev) => prev.filter((e) => e._id !== deleteTargetId));
      setShowDeleteModal(false);
      setDeleteTargetId(null);
    } catch {
      setExpError("Failed to delete expense");
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  return (
    <div className="min-h-screen bg-[#07090a] text-gray-200 px-4 sm:px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center pt-10">
          <h2 className="text-4xl font-extrabold text-white mb-2 text-center">
            User Profile
          </h2>
          <p className="text-gray-400 mb-8 text-center text-lg">
            Manage your account & transaction history
          </p>
        </div>

        {/* Profile + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileCard user={user} loading={loading} error={error} initials={initials} />
          <SummaryCard expenses={expenses} loading={expLoading} error={expError} />
        </div>

        {/* Transaction History */}
        <div className="rounded-2xl bg-[#0b0f12] p-6 border border-[#111318] shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: ACCENT }}>
            Transaction History
          </h3>

          {expLoading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : expenses.length === 0 ? (
            <p className="text-gray-400 text-center">No transactions yet.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#0d1112] border-b-2 border-[#b5f277]/30">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-[#b5f277] uppercase tracking-wide">Category</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#b5f277] uppercase tracking-wide">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#b5f277] uppercase tracking-wide">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#b5f277] uppercase tracking-wide hidden sm:table-cell">Description</th>
                      <th className="text-center py-3 px-4 font-semibold text-[#b5f277] uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#111318]">
                    {paginatedExpenses.map((e) => (
                      <tr key={e._id} className="hover:bg-[#0d1112]/50 transition">
                        {editingId === e._id ? (
                          <>
                            <td className="py-3 px-4">
                              <input
                                value={editCategory}
                                onChange={(i) => setEditCategory(i.target.value)}
                                className="w-full bg-[#071014] text-white px-2 py-1 rounded border border-[#b5f277]/40 focus:ring-2 focus:ring-[#b5f277]"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="number"
                                value={editAmount}
                                onChange={(i) => setEditAmount(i.target.value)}
                                className="w-full bg-[#071014] text-white px-2 py-1 rounded border border-[#b5f277]/40 focus:ring-2 focus:ring-[#b5f277]"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="date"
                                value={editDate}
                                onChange={(i) => setEditDate(i.target.value)}
                                className="w-full bg-[#071014] text-white px-2 py-1 rounded border border-[#b5f277]/40 focus:ring-2 focus:ring-[#b5f277]"
                              />
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <input
                                value={editDescription}
                                onChange={(i) => setEditDescription(i.target.value)}
                                className="w-full bg-[#071014] text-white px-2 py-1 rounded border border-[#b5f277]/40 focus:ring-2 focus:ring-[#b5f277]"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => saveEdit(e._id)}
                                  className="px-3 py-1 bg-[#b5f277] text-[#0d1112] rounded-lg font-semibold text-base "
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="px-3 py-1 bg-[#23282c] text-gray-300 rounded-lg font-semibold text-base "
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-4">
                              <span className="inline-block bg-[#b5f277]/10 border border-[#b5f277]/30 text-[#b5f277] px-3 py-1 rounded-full text-xs font-semibold">
                                {e.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-white">₹{e.amount}</td>
                            <td className="py-3 px-4 text-white">{new Date(e.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">{e.description || "-"}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => startEdit(e)}
                                  className="px-3 py-1 bg-[#b5f277] text-[#0d1112] rounded-lg font-semibold"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => openDeleteModal(e._id)}
                                  className="px-3 py-1 bg-[#a50000] text-white rounded-lg font-semibold "
                                >
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#0d1112] text-[#b5f277] rounded-lg font-semibold text-sm border border-[#b5f277]/30 hover:bg-[#111318] transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <span className="text-gray-400 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#0d1112] text-[#b5f277] rounded-lg font-semibold text-sm border border-[#b5f277]/30 hover:bg-[#111318] transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0b0f12] border border-[#a50000] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-[#a50000]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#a50000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this expense? This will permanently remove it from your records.
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-[#a50000] text-white rounded-lg font-semibold hover:bg-[#ff8787] transition"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 bg-[#23282c] text-gray-300 rounded-lg font-semibold hover:bg-[#2d3438] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;

/* ---------------- Components ---------------- */

const ProfileCard = ({ user, loading, error, initials }) => (
  <div className="rounded-lg bg-[#0b0f12] p-6 ">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#b5f277] text-[#0d1112]">
        {initials}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">Account Details</h3>
        <p className="text-sm text-gray-400">Personal information</p>
      </div>
    </div>

    {loading ? (
      <p className="text-gray-400">Loading...</p>
    ) : error ? (
      <p className="text-red-400">{error}</p>
    ) : (
      <div className="space-y-2 text-base">
        <p className="font-semibold"><span className="text-white">Name : </span> {user?.name}</p>
        <p className="font-semibold"><span className="text-white font-semibold">Email: </span> {user?.email}</p>
      </div>
    )}
  </div>
);

const SummaryCard = ({ expenses, loading, error }) => (
  <div className="rounded-lg bg-[#0b0f12] p-6">
    <h3 className="text-lg font-bold mb-4 text-[#b5f277] text-center">Expense Summary</h3>

    {loading ? (
      <p className="text-gray-400">Loading...</p>
    ) : error ? (
      <p className="text-red-400">{error}</p>
    ) : (
      <div className="grid grid-cols-3 gap-4 ">
        <SummaryItem label="Entries" value={expenses.length} />
        <SummaryItem label="Total" value={`₹${expenses.reduce((s, e) => s + e.amount, 0)}`} />
        <SummaryItem label="Latest" value={expenses[0] ? new Date(expenses[0].date).toLocaleDateString() : "-"} />
      </div>
    )}
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="bg-[#23282c] rounded-lg p-4 text-center">
    <p className="text-xs text-white uppercase">{label}</p>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);
