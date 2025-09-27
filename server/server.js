require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const mongoose=require('mongoose');

// ... inside your mongoose.connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

const app = express();

// // CORS middleware (must be first)
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

// --- START: This is the code you need to add/replace ---
const corsOptions = {
  // This is the origin of your React app
  origin: 'http://localhost:3000' 
};

// Use the configured cors options
app.use(cors(corsOptions)); 
// --- END ---

// Make sure this is placed before your routes (app.use("/api/auth", authRoutes);)
app.use(express.json());


// Connect Database
connectDB();

// Init Middleware
// app.use(express.json({ extended: false })); // Allows us to accept JSON data in the body

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Add this block before app.listen
app.get("/api/test", (req, res) => {
  console.log("✅ /api/test route was hit!");
  res.json({ message: "CORS is working!" });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

app.get('/test', (req, res) => {
  res.json({ message: 'CORS works!' });
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});