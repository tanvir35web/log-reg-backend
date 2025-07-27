const { Sequelize } = require('sequelize');

// Update these values with your MySQL credentials
const sequelize = new Sequelize('e_com', 'root', 'Admin2025@', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
