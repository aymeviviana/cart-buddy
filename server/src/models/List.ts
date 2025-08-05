import mongoose, { Document, Schema } from "mongoose";

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

// Mongoose schema for items
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

export const List = mongoose.model<IList>("List", listSchema);

// Helper function: create a new list
export function createList(name: string, items: IItem[] = []) {
  return new List({
    name: name.trim(),
    items,
  });
}

// Helper function: update a list
export function updateList(updates: Partial<Pick<IList, "name" | "items">>) {
  return {
    ...updates,
    updatedAt: new Date(),
  };
}