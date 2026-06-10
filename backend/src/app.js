const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

/* =========================
   Security
========================= */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

/* =========================
   CORS
========================= */

const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:3000,http://localhost:3001,http://localhost:3002,https://launch-folio-pi.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {
    // Allow Postman, curl, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("❌ Blocked by CORS:", origin);

    return callback(
      new Error(`Origin ${origin} is not allowed by CORS`)
    );
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],
};

app.use(cors(corsOptions));

/* =========================
   Debug Origin (optional)
========================= */
app.use((req, res, next) => {
  console.log("🌍 Request Origin:", req.headers.origin);
  next();
});

/* =========================
   Rate Limiting
========================= */
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests, please try again later",
    },
  })
);

/* =========================
   Body Parsing
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================
   Logging
========================= */
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/* =========================
   Routes
========================= */
app.use("/api/v1", routes);

/* =========================
   Health Check
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LaunchFolio API running",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   404 Handler
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

/* =========================
   Global Error Handler
========================= */
app.use(errorMiddleware);

module.exports = app;