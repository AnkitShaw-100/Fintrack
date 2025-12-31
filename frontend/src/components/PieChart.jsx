import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ expenses, heightClass = "h-80" }) => {
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const labels = Object.keys(totals);
  const dataValues = Object.values(totals);

  // Preferred colors per known category for consistent visuals
  const CATEGORY_COLORS = {
    Food: "#22c55e",
    Transportation: "#3b82f6",
    Housing: "#f59e0b",
    Entertainment: "#ef4444",
    Utilities: "#06b6d4",
    Healthcare: "#a855f7",
    Education: "#14b8a6",
    Shopping: "#f97316",
    Other: "#64748b",
  };

  const fallbackPalette = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#14b8a6",
    "#e11d48",
    "#f97316",
    "#64748b",
  ];

  const backgroundColor = labels.map((lab, idx) => {
    return (
      CATEGORY_COLORS[lab] || fallbackPalette[idx % fallbackPalette.length]
    );
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total",
        data: dataValues,
        backgroundColor,
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

  return (
    <div
      className={`${heightClass} bg-[#0c1112] p-4 rounded-lg overflow-hidden`}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
