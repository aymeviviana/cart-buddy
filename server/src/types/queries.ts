import { ObjectId } from "mongodb";
import { List } from "../models/List.js";

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