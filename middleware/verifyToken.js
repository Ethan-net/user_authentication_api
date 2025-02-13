const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - no token provided",
      status: false,
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not defined in environment variables");
    return res.status(500).json({
      message: "Server misconfiguration",
      success: false,
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
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(500).json({
      message: "Server error during token verification",
      success: false,
    });
  }
};

module.exports = verifyToken;
