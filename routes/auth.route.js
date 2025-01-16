const express = require("express");
const {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPass,
  resetPass,
} = require("../controller/auth.controller");

const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgotPassword", forgotPass);
router.post("/resetPassword/:token", resetPass);

module.exports = router;
