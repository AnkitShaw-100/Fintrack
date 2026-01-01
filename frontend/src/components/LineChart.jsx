import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Build monthly totals for last 12 months
const buildMonthlyData = (expenses) => {
  const now = new Date();
  const months = [];
  const totals = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    months.push(key);
    const monthTotal = expenses
      .filter((e) => {
        const ed = new Date(e.date);
        return (
          ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear());
      })
      .reduce((s, e) => s + e.amount, 0);
    totals.push(monthTotal);
  }

  return { months, totals };
};

const LineChart = ({ expenses = [], heightClass = "h-64" }) => {
  const { months, totals } = buildMonthlyData(expenses);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Spend",
        data: totals,
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, labels: { color: "#fff" } },
      title: { display: true, text: "Monthly Expenses", color: "#b5f277" },
      tooltip: {
        mode: "index",
        intersect: false,
        titleColor: "#fff",
        bodyColor: "#fff",
        backgroundColor: "rgba(0,0,0,0.75)",
      },
    },
    scales: {
      x: { grid: { display: false, color: "rgba(255,255,255,0.08)" }, ticks: { color: "#fff" } },
      y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.08)" }, ticks: { color: "#fff" } },
    },
    elements: {
      line: { borderColor: "#fff" },
      point: { backgroundColor: "#fff", borderColor: "#fff" },
    },
  };

  return (
    <div
      className={`${heightClass} bg-[#0c1112] rounded-lg p-4 flex flex-col overflow-hidden`}
    >
      <div className="flex-1 flex items-center justify-center">
        {!expenses.length ? (
          <div className="text-center text-gray-500">No expense data</div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default LineChart;
