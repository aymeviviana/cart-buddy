import mongoose from "mongoose";

/**
 * 🎯 FEEDBACK: Mongoose Connection
 *
 * Mongoose provides a much simpler connection API compared to the MongoDB SDK.
 * It handles connection pooling, reconnection, and error handling automatically.
 *
 * Benefits:
 * - Simpler connection setup
 * - Automatic reconnection
 * - Better error handling
 * - Built-in connection pooling
 */

const connectionString: string = process.env.ATLAS_URI || "";

if (!connectionString) {
  throw new Error("ATLAS_URI environment variable is required");
}

/**
 * 🎯 FEEDBACK: Connection Management
 *
 * Mongoose handles connection state internally, so we don't need to
 * manage connection variables ourselves.
 */
export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log("✅ Successfully connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw new Error(
      `Database connection failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * 🎯 FEEDBACK: Graceful Shutdown
 *
 * Mongoose provides a simple disconnect method that handles
 * all the cleanup automatically.
 */
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
    throw error;
  }
}

/**
 * 🎯 FEEDBACK: Connection Status
 *
 * Mongoose provides easy ways to check connection status.
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * 🎯 FEEDBACK: Connection Events
 *
 * Mongoose provides useful events for monitoring connection status.
 */
mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (error: Error) => {
  console.error("🔴 Mongoose connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("🟡 Mongoose disconnected from MongoDB");
});

// For backward compatibility (but prefer connectToDatabase() in new code)
export default mongoose.connection;
