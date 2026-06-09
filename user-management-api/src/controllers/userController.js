const users = require("../utils/db");

function getAllUsers(req, res) {
  const safeUsers = users.map(({ password, ...user }) => user);
  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    count: safeUsers.length,
    data: safeUsers,
  });
}

function getUserById(req, res) {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with id '${id}' not found`,
    });
  }
  const { password, ...safeUser } = user;
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: safeUser,
  });
}

function getMyProfile(req, res) {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const { password, ...safeUser } = user;
  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: safeUser,
  });
}

module.exports = { getAllUsers, getUserById, getMyProfile };