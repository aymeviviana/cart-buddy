import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const connectionString: string = process.env.ATLAS_URI || "";

if (!connectionString) {
  throw new Error("ATLAS_URI environment variable is required.");
}

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

export async function closeDatabaseConnection(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
    throw error;
  }
}

export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

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