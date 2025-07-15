const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User, // Export the model for direct use if needed
  findByEmail: async (email) => await User.findOne({ email }),
  create: async (user) => await User.create(user),
};
