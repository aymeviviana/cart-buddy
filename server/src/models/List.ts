import mongoose, { Document, Schema } from "mongoose";

/**
 * 🎯 FEEDBACK: Mongoose vs MongoDB SDK
 *
 * Mongoose provides better TypeScript integration and a more intuitive API.
 * It handles schema validation, middleware, and type safety out of the box.
 *
 * Benefits:
 * - Automatic TypeScript types from schemas
 * - Built-in validation
 * - Middleware support (pre/post hooks)
 * - Better query API
 * - Automatic timestamps
 */

// TypeScript interface for the document
export interface IList extends Document {
  name: string;
  items: IItem[];
  createdAt: Date;
  updatedAt: Date;
}

// TypeScript interface for embedded items
export interface IItem {
  barcode: string;
  name: string;
  brand: string;
}

// Mongoose schema for items (embedded document)
const itemSchema = new Schema<IItem>(
  {
    barcode: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { _id: false }
); // Don't create _id for embedded documents

// Mongoose schema for lists
const listSchema = new Schema<IList>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    items: [itemSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

/**
 * 🎯 FEEDBACK: Implicit Typing
 *
 * With Mongoose, we can rely more on implicit typing.
 * The Model type is automatically inferred from the schema.
 */

// Create and export the model
export const List = mongoose.model<IList>("List", listSchema);

/**
 * 🎯 FEEDBACK: Helper Functions
 *
 * These helper functions are now simpler since Mongoose handles
 * a lot of the complexity for us.
 */

// Helper function to create a new list (simplified)
export function createList(name: string, items: IItem[] = []) {
  return new List({
    name: name.trim(),
    items,
  });
}

// Helper function to update a list
export function updateList(updates: Partial<Pick<IList, "name" | "items">>) {
  return {
    ...updates,
    updatedAt: new Date(),
  };
}
