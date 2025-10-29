const express = require("express");
const cors = require("cors");
const nurseRoutes = require("./routes/nurseRoutes.js");
require("dotenv").config();
require("./config/db_config");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/nurses", nurseRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Nurse Management System Backend is Running");
});

app.listen(PORT, () => {
  console.log("http://localhost:${PORT}");
});
