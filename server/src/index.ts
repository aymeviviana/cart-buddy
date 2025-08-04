import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase, closeDatabaseConnection } from "./db/conn.js";
import errorHandler from "./middleware/errorHandler.js";
import listsRouter from "./routes/lists.js";

/**
 * 🎯 FEEDBACK: Server Setup Improvements
 *
 * Your original server setup was missing proper database initialization
 * and graceful shutdown handling. Here's how to improve it.
 */

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🎯 FEEDBACK: Middleware Order
// Always set up middleware before routes
app.use(cors());
app.use(express.json());

// 🎯 FEEDBACK: Health Check Endpoint
// Always include a health check for monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 🎯 FEEDBACK: API Routes
// Use versioned routes for better API management
app.use("/api/v1/lists", listsRouter);

// 🎯 FEEDBACK: 404 Handler
// Always handle unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// 🎯 FEEDBACK: Error Handling
// Error handler should be last
app.use(errorHandler);

/**
 * 🎯 FEEDBACK: Database Initialization
 *
 * Initialize the database connection before starting the server.
 * This ensures your app is ready to handle requests.
 */
async function startServer() {
  try {
    // Connect to database
    await connectToDatabase();

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📊 Health check: http://localhost:${port}/health`);
      console.log(`📝 API docs: http://localhost:${port}/api/v1/lists`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

/**
 * 🎯 FEEDBACK: Graceful Shutdown
 *
 * Always handle graceful shutdown to prevent data corruption
 * and ensure resources are properly cleaned up.
 */
async function gracefulShutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  try {
    await closeDatabaseConnection();
    console.log("✅ Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
}

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

// Start the server
startServer();
