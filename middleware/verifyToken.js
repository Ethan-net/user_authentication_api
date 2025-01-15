const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.status(400).json({
      message: " Unauthorized - no teken provided",
      status: false,
    });
  }
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "unauthorized- invalid Token",
      });
    }
  } catch (error) {}
};
