const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./backend/routes/authRoutes.js");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all CORS requests
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get(
  "/api/dashboard",
  require("./backend/middlewares/authMiddleware"),
  (req, res) => {
    res.json({ message: "Welcome to your dashboard!", user: req.user });
  }
);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
