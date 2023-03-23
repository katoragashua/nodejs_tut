// Function for creating user object.
const tokenUser = (user) => {
  return { name: user.name, email: user.email, role: user.role };
};

module.exports = tokenUser;
