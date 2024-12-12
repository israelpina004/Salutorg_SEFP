const express = require("express");
const bcrypt = require("bcrypt");

const {
  registerUser,
  loginUser,
  getBalance,
  updateBalance,
  getUsers,
  logoutUser,
  getLoggedInUser,
  addComment, 
  getComments,
  acceptBid
} = require("../controllers/userController");

const router = express.Router();

// Routes to the functions
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getlogin", getLoggedInUser);
router.post("/logout", logoutUser);
router.get("/balance/:userId", getBalance);
router.post("/update-balance", updateBalance);
router.post("/addcomment", addComment);
router.get("/getcomment", getComments);
router.get("/", getUsers);
router.post("/acceptBid", acceptBid);

module.exports = router;
