const users = []; // use a DB like MongoDB in production

module.exports = {
  findByEmail: (email) => users.find((user) => user.email === email),
  create: (user) => users.push(user),
};
