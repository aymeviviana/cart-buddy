import { IItem } from "../models/List.js";

/**
 * 🎯 FEEDBACK: Simplified Types
 *
 * Instead of complex DTOs, we're using simple TypeScript types.
 * This is more beginner-friendly and easier to understand.
 *
 * Benefits:
 * - Simpler to understand
 * - Less boilerplate
 * - More intuitive for beginners
 * - Still provides type safety
 */

// API input type - what the client sends
export interface CreateListRequest {
  name: string;
  items: IItem[];
}

// API output type - what the server sends back
export interface ListResponse {
  _id: string;
  name: string;
  items: IItem[];
  createdAt: string;
  updatedAt: string;
}

// API input type for updating a list
export interface UpdateListRequest {
  name?: string;
  items?: IItem[];
}

/**
 * 🎯 FEEDBACK: Type Conversion Helpers
 *
 * Simple helper functions to convert between Mongoose documents and API responses.
 * This handles the serialization of ObjectIds and Dates.
 */

export function listToResponse(list: any): ListResponse {
  return {
    _id: list._id.toString(),
    name: list.name,
    items: list.items,
    createdAt: list.createdAt.toISOString(),
    updatedAt: list.updatedAt.toISOString(),
  };
}

export function listsToResponse(lists: any[]): ListResponse[] {
  return lists.map(listToResponse);
}
