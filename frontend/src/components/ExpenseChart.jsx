import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ expenses, heightClass = "h-80" }) => {
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const labels = Object.keys(totals);
  const dataValues = Object.values(totals);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total",
        data: dataValues,
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#a855f7",
          "#14b8a6",
          "#e11d48",
          "#f97316",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Expenses by Category" },
      tooltip: { enabled: true },
    },
  };

  if (!labels.length) {
    return <div className="text-center text-gray-500">No expense data</div>;
  }

  return <div className={heightClass}><Pie data={chartData} options={options} /></div>;
};

export default ExpenseChart;
