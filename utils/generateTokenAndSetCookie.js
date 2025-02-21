const jwt = require("jsonwebtoken");

require("dotenv").config();

secretToken = process.env.JWT_SECRET;

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, secretToken, { expiresIn: "7d" });

  res.cookie("myToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = generateTokenAndSetCookie;
