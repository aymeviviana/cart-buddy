import { IItem } from "../models/List.js";

// API output type - Error Response Message
export interface ErrorResponseMessage {
  error: string;
}

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

// helper functions convert Mongoose documents to API responses
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
