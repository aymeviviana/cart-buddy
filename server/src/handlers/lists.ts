import { NextFunction, Request, Response } from "express";
import { List, createList as createListModel } from "../models/List.js";
import {
  CreateListRequest,
  ListResponse,
  listToResponse,
  listsToResponse,
} from "../types/api.js";
import { CustomError } from "../types/customError.js";
import { listSchema } from "../types/lists.js";


export async function getLists(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const lists = await List.find().limit(10);
    const responseData = listsToResponse(lists);
    response.status(200).send(responseData);
  } catch (error) {
    return next(error);
  }
}

export async function createList(
  request: Request<{}, {}, CreateListRequest>,
  response: Response,
  next: NextFunction
) {
  try {
    // zod runtime type validation
    const parsedListBody = listSchema.safeParse(request.body);
    if (!parsedListBody.success) {
      const error: CustomError = new Error(parsedListBody.error.message);
      error.status = 400;
      return next(error);
    }

    // typescript compile time validation
    const newList = createListModel(
      parsedListBody.data.name,
      parsedListBody.data.items
    );
    
    await newList.save();
    const responseData = listToResponse(newList);
    response.status(201).send(responseData);
  } catch (error) {
    return next(error);
  }
}

export async function deleteList(
  request: Request<{ listId: string }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { listId } = request.params;
    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
      const error: CustomError = new Error(
        "List was not found. Please try again."
      );
      error.status = 404;
      throw error;
    }

    response.status(200).send({ _id: listId });
  } catch (error) {
    return next(error);
  }
}

export async function getListById(
  request: Request<{ listId: string }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { listId } = request.params;
    const list = await List.findById(listId);

    if (!list) {
      const error: CustomError = new Error("List not found");
      error.status = 404;
      throw error;
    }

    const responseData = listToResponse(list);
    response.status(200).send(responseData);
  } catch (error) {
    return next(error);
  }
}

export async function updateList(
  request: Request<{ listId: string }, {}, { name?: string; items?: any[] }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { listId } = request.params;
    const updates = request.body;
    const updatedList = await List.findByIdAndUpdate(
      listId,
      updates,
      { new: true, runValidators: true } // Return updated doc and run validation
    );

    if (!updatedList) {
      const error: CustomError = new Error("List not found");
      error.status = 404;
      throw error;
    }

    const responseData = listToResponse(updatedList);
    response.status(200).send(responseData);
  } catch (error) {
    return next(error);
  }
}