const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
require("dotenv").config();

const app = express();

// Middleware setup
app.use(express.json()); // Body parser middleware
// You can add other middleware like CORS setup, logging, etc. here

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
