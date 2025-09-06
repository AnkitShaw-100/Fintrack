import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

import type { Expense } from "../types";

type ExpenseChartProps = {
  expenses: Expense[];
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Group expenses by category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total Amount",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#66FF66", "#FF6666"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h3>Expenses by Category</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseChart;
