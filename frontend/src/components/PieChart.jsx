import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ expenses, heightClass = "h-56 sm:h-64 md:h-80" }) => {
  const [legendPos, setLegendPos] = useState("bottom");
  const [titleFontSize, setTitleFontSize] = useState(14);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (mq.matches) {
        setLegendPos("right");
        setTitleFontSize(16);
      } else {
        setLegendPos("bottom");
        setTitleFontSize(12);
      }
    };
    update();
    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, []);
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const labels = Object.keys(totals);
  const dataValues = Object.values(totals);

  // Preferred colors per known category for consistent visuals
  const CATEGORY_COLORS = {
    Food: "#22c55e",
    Transport: "#3b82f6",
    Housing: "#f59e0b",
    Movies: "#ef4444",
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
    color: "#ffffff",
    plugins: {
      legend: {
        position: legendPos,
        labels: { boxWidth: 12, padding: 8, color: "#ffffff" },
      },
      title: {
        display: true,
        text: "Expenses by Category",
        font: { size: titleFontSize },
        color: "#b5f277",
      },
      tooltip: {
        enabled: true,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.75)",
      },
    },
    layout: { padding: { top: 6, bottom: 6, left: 6, right: 6 } },
  };

  return (
    <div
      className={`${heightClass} bg-[#0c1112] p-3 sm:p-4 rounded-lg overflow-hidden`}
    >
      <div className="w-full h-full flex items-center justify-center">
        {!labels.length ? (
          <div className="text-center text-gray-500">No expense data</div>
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default PieChart;
