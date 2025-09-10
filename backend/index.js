const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");
const userRoutes = require("./routes/user");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: ["https://fintrack-fullstack.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
