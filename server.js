const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/mini-crm")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));