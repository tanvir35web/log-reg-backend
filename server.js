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


// ✅ Replace with your deployed frontend URL
const allowedOrigins = [
  "https://login-registration-omega.vercel.app/",
  "http://localhost:3000", // Optional: for local development
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Optional: if using cookies or Authorization
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
// app.options("*", cors());


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
