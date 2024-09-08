const express = require("express");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const studentRouter = require("./routes/studentRoutes");
const formRouter = require("./routes/formRoutes");
const authRouter = require("./routes/authRoutes");
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");


const app = express();

// MIDDLEWARES

app.use(cookieParser())

// Security HTTP Headers 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies and other credentials
}));
app.use(helmet())

console.log("NODE_ENV : ", process.env.NODE_ENV);

// Use morgan only when in DEVELOPMENT

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same IP
const limiter = rateLimit({
    max:50,
    windows:60 * 60 * 1000, 
    message:'Too many requests from this IP, please try again in an hour!'
})
app.use('/api',limiter);
// Parser

app.use(express.json());

// ROUTES
// app.use("/api/v1/users", userRouter);
app.use("/api/v1/forms", formRouter);
app.use("/api/v1/students",studentRouter);
app.use("/api/v1/auth",authRouter)

app.all("*", (req, res) => {
  // for handling requests that do not match any of the specefied routes
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this Server`,
  });
});

module.exports = app;
