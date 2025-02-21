const express = require("express");
const authRoutes = require("./routes/auth.route");

const cookieParser = require("cookie-parser");

const databaseconnect = require("./config/dbconnect");
require("dotenv").config();

const app = express();
app.use(cookieParser()); // Allows us to pass incoming cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

const port = process.env.PORT;

databaseconnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
