import React from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

/* ------------------ Expense Tracking ------------------ */

const ExpenseTracking = ({ expenses = [] }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
        Expense Overview
      </h2>

      <Overview expenses={expenses} />

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <div className="flex flex-col w-full">
            <div className="h-56 sm:h-64 md:h-80 w-full">
              <PieChart expenses={expenses} heightClass="h-56 sm:h-64 md:h-80" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="h-56 sm:h-64 md:h-80 w-full">
              <LineChart expenses={expenses} heightClass="h-56 sm:h-64 md:h-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracking;

/* ------------------ Overview ------------------ */

const Overview = ({ expenses }) => {
  const now = new Date();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 md:gap-6 mb-6 items-stretch w-full">
      <StatCard
        title="Total Spend"
        value={`₹${total.toFixed(2)}`}
        subtitle="All time"
      />
      <StatCard
        title="This Month"
        value={`₹${currentMonthTotal.toFixed(2)}`}
        subtitle={now.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      />
      <StatCard
        title="Top Category"
        value={topCategory}
        subtitle="Highest spend"
      />
    </div>
  );
};

/* ------------------ Stat Card ------------------ */

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-lg p-4 sm:p-6 bg-[#0c1112] transition h-full flex flex-col items-center md:items-start justify-center text-center md:text-left min-w-0 w-full overflow-hidden">
      <div className="text-sm md:text-base font-medium text-[#b5f277] w-full truncate md:whitespace-normal">
        {title}
      </div>
      <div className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white w-full truncate md:whitespace-normal break-words">
        {value}
      </div>
      <div className="mt-2 text-xs md:text-sm text-gray-400 w-full truncate md:whitespace-normal">
        {subtitle}
      </div>
    </div>
  );
};
