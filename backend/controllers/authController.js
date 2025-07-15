const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "Name, Email and password are required" });
  }
  const { name, email, password } = req.body;
  const existing = await userModel.findByEmail(email); // await here!
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  await userModel.create({ name, email, password: hashed }); // await here!
  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email); // await here!
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};