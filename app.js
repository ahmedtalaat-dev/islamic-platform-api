const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRouter = require("./routes/authRouter");
const hadithRouter = require("./routes/hadithRouter");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/hadiths", hadithRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Islamic Platform API is running",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
