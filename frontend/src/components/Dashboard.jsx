import { useEffect, useState } from "react";
import API from "../api";

import ExpenseTracking from "./ExpenseTracking";
import Budgeting from "./Budgeting";
import InsightsReports from "./InsightsReports";

/* ------------------ Constants ------------------ */

const CATEGORIES = [
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

const TABS = [
  { label: "Expense Tracking", component: null }, // will render below
  { label: "Budgeting", component: <Budgeting /> },
  { label: "Insights & Reports", component: <InsightsReports /> },
];

/* ------------------ Dashboard ------------------ */

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0);

  /* -------- Fetch Expenses -------- */

  const fetchExpenses = async () => {
    const token = localStorage.getItem("fintrack_token");
    if (!token) {
      setError("Please log in to view expenses.");
      return;
    }

    try {
      const res = await API.get("/api/expenses");
      setExpenses(res.data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* -------- Render -------- */

  return (
    <div className="min-h-screen bg-[#07090a] text-gray-200 flex pt-24">
      {/* Sidebar */}
      <aside className="w-64 ml-20 min-h-full py-8 px-4">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        <nav className="flex flex-col gap-2">
          {TABS.map((t, idx) => (
            <button
              key={t.label}
              onClick={() => setTab(idx)}
              className={`text-left px-5 py-3 rounded-lg font-semibold transition
                ${
                  tab === idx
                    ? "bg-[#b5f277] text-[#0d1112] shadow"
                    : "text-white hover:bg-[#23282c]"
                }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-8">
        {tab === 0 && <>
          {error && (
            <div className="mb-4 text-red-400 text-sm">{error}</div>
          )}
          <ExpenseTracking categories={CATEGORIES} expenses={expenses} />
        </>}
        {tab !== 0 && <>
          {error && (
            <div className="mb-4 text-red-400 text-sm">{error}</div>
          )}
          {TABS[tab].component}
        </>}
      </main>
    </div>
  );
};

export default Dashboard;
