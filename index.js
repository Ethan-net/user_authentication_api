const express = require("express");
const authRoutes = require("./routes/auth.route");

const cookiePaser = require("cookie-parser");

const databaseconnect = require("./config/dbconnect");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cookiePaser()); // Allows us to pass incoming cookies

const port = process.env.PORT;

databaseconnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
