const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./backend/routes/authRoutes.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get("/api/dashboard", require("./backend/middlewares/authMiddleware"), (req, res) => {
  res.json({ message: "Welcome to your dashboard!", user: req.user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
