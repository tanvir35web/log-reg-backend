const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./backend/routes/authRoutes.js");
const productRoutes = require("./backend/routes/productRoutes.js");
const authMiddleware = require("./backend/middlewares/authMiddleware.js");
const sequelize = require("./backend/sequelize");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your dashboard!", user: req.user });
});

// Sync Sequelize and start server
sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
