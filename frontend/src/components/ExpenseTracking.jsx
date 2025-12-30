import React from "react";

/* ------------------ Expense Tracking ------------------ */

const ExpenseTracking = ({ expenses = []}) => {
  return (
    <div className="max-w-4xl  px-6 ">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Expense Tracking
      </h2>

      <Overview expenses={expenses} />

      {/* Later: expense list, add form, filters, etc */}
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
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
    <div className="rounded-lg p-6 bg-[#0c1112] transition text-center">
      <div className="text-sm font-medium text-[#b5f277] ">
        {title}
      </div>
      <div className="mt-2 text-2xl font-bold text-white">
        {value}
      </div>
      <div className="mt-1 text-xs text-gray-400">
        {subtitle}
      </div>
    </div>
  );
};
