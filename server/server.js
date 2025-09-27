require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");

// ... inside your mongoose.connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect Database
connectDB();

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/auth")); // Add this line for /api/user/me

app.get("/api/test", (req, res) => {
  console.log("✅ /api/test route was hit!");
  res.json({ message: "CORS is working!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

app.get("/test", (req, res) => {
  res.json({ message: "CORS works!" });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});
