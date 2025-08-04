import { IItem as Item } from "../models/List.js";

/**
 * 🎯 FEEDBACK: DTO (Data Transfer Object) Best Practices
 *
 * DTOs should represent the structure of data being transferred between client and server.
 * They are different from database models because they:
 * - Don't include database-specific fields like _id, createdAt, updatedAt
 * - May have different validation rules
 * - Can be versioned independently of your database schema
 * - Should be focused on the API contract, not internal data structure
 */

// API Input DTO - what the client sends when creating a list
export interface CreateListDto {
  name: string;
  items: Item[] | []; // Allow empty array for new lists
}

/**
 * 🎯 FEEDBACK: API Response DTOs
 *
 * You should also create separate DTOs for API responses.
 * This ensures your API contract is stable even if your database schema changes.
 */

// API Output DTO - what the server sends back to the client
export interface ListResponseDto {
  _id: string; // Convert ObjectId to string for JSON serialization
  name: string;
  items: Item[];
  createdAt: string; // Convert Date to ISO string for JSON
  updatedAt: string;
}
