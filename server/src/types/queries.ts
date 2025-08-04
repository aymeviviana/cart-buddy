import { ObjectId } from "mongodb";
import { List } from "../models/List.js";

/**
 * 🎯 FEEDBACK: Query Types
 *
 * Your original SingleListQuery was too generic. Instead, create specific query types
 * that are tied to your models and provide better type safety.
 *
 * BENEFITS:
 * - Type safety for query fields
 * - Better IDE autocomplete
 * - Prevents typos in field names
 * - Makes refactoring easier
 */

// Query to find a list by ID
export interface ListByIdQuery {
  _id: ObjectId;
}

// Query to find lists by name (for search functionality)
export interface ListByNameQuery {
  name: { $regex: string; $options: string };
}

// Query to find lists created after a certain date
export interface ListByDateQuery {
  createdAt: { $gte: Date };
}

// Query to find lists that contain specific items
export interface ListByItemQuery {
  "items.name": { $in: string[] };
}

/**
 * 🎯 FEEDBACK: Query Builder Functions
 *
 * Helper functions to create properly typed queries.
 * This prevents errors and makes your code more readable.
 */

export function createListByIdQuery(id: string): ListByIdQuery {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId format");
  }
  return { _id: new ObjectId(id) };
}

export function createListByNameQuery(name: string): ListByNameQuery {
  return {
    name: {
      $regex: name,
      $options: "i", // Case insensitive
    },
  };
}

export function createListByDateQuery(date: Date): ListByDateQuery {
  return {
    createdAt: { $gte: date },
  };
}

/**
 * 🎯 FEEDBACK: Advanced Query Types
 *
 * For more complex queries, you can create union types or generic query builders.
 */

// Union type for different list queries
export type ListQuery =
  | ListByIdQuery
  | ListByNameQuery
  | ListByDateQuery
  | ListByItemQuery;

// Generic query builder for partial matches
export function createPartialMatchQuery<T extends keyof List>(
  field: T,
  value: List[T]
): Partial<Record<T, List[T]>> {
  return { [field]: value } as Partial<Record<T, List[T]>>;
}
