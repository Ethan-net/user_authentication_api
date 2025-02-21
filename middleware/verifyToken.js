const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Received cookies:", req.cookies);
  const token = req.cookies.myToken;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - no token provided",
      status: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - invalid token",
        status: false,
      });
    }
    req.userId = decoded.userId; // Attach userId to request
    next(); // Proceed to the next middleware or ro ute handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(500).json({
      message: "Server error during token verification",
      success: false,
    });
  }
};

module.exports = verifyToken;
