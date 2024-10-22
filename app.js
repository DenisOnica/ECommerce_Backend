const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const productsRoutes = require("./Routes/productsRoutes");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://onlinestore-showcase.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api", productsRoutes);
