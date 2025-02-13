const express = require("express");
const {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPass,
  resetPass,
  checkAuth,
} = require("../controller/auth.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgotPassword", forgotPass);
router.post("/resetPassword/:token", resetPass);

module.exports = router;
