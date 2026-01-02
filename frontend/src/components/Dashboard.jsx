import { useEffect, useState } from "react";
import API from "../api";
import Budgeting from "./Budgeting.jsx";
import ExpenseOverview from "./ExpenseOverview.jsx";
import AddExpense from "./AddExpense.jsx";

const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Movies",
  "Utilities",
  "Healthcare",
  "Education",
  "Shopping",
  "Other",
];

const TABS = ["Overview", "Budgeting", "Add Expense"];

const Dashboard = () => {
  const [tab, setTab] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get("/api/expenses");
      setExpenses(data);
    } catch (error) {
      console.error(error);
      if (error?.isAuthRedirect) return; // auth handled globally
      setError(error?.response?.data?.message || "Failed to fetch expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-[#07090a] text-gray-200 flex flex-col pt-24">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:gap-4">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 py-8 px-4 md:sticky md:top-28">
          <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

          <nav className="flex flex-col gap-2">
            {TABS.map((t, idx) => (
              <button
                key={t}
                onClick={() => setTab(idx)}
                className={`text-left px-5 py-3 rounded-lg font-semibold transition
                ${tab === idx
                    ? "bg-[#b5f277] text-[#0d1112] shadow"
                    : "text-white hover:bg-[#23282c]"
                  }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Tabs */}
        <div className="md:hidden px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {TABS.map((t, idx) => (
              <button
                key={t}
                onClick={() => setTab(idx)}
                className={`whitespace-nowrap px-3 py-2 rounded-lg font-semibold text-sm
                ${tab === idx
                    ? "bg-[#b5f277] text-[#0d1112]"
                    : "text-white hover:bg-[#23282c]"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:px-4 py-8">
          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

          <div className="max-w-[1200px] mx-auto">
            {tab === 0 && (
              <ExpenseOverview categories={CATEGORIES} expenses={expenses} />
            )}

            {tab === 1 && <Budgeting />}
            {tab === 2 && <AddExpense onSaved={fetchExpenses} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
