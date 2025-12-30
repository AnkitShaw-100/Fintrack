import React from "react";
import CurrencyConverter from "./CurrencyConverter";

const tabList = [
  { label: "Expense Tracking" },
  { label: "Budgeting" },
  { label: "Insights & Reports" },
];

const SideNavbar = ({ tab, setTab }) => (
  <aside className="w-64 min-h-full bg-[#181f23] border-r border-[#23282c] flex flex-col py-8 px-4">
    <h2 className="text-xl font-bold text-[#b5f277] mb-8">Dashboard</h2>
    <nav className="flex flex-col gap-2">
      {tabList.map((t, idx) => (
        <button
          key={t.label}
          className={`text-left px-4 py-2 rounded-lg font-semibold transition-colors duration-100 ${
            tab === idx
              ? "bg-[#b5f277] text-[#0d1112] shadow"
              : "text-white hover:bg-[#23282c] active:bg-[#b5f277] active:text-[#0d1112]"
          }`}
          onClick={() => setTab(idx)}
        >
          {t.label}
        </button>
      ))}
    </nav>
    <CurrencyConverter />
  </aside>
);

export default SideNavbar;
