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

/**
 * 🎯 FEEDBACK: Mongoose Handlers
 *
 * With Mongoose, our handlers become much simpler and more intuitive.
 * We can rely on implicit typing and Mongoose's built-in features.
 *
 * Key improvements:
 * - No need to manage database connections manually
 * - Implicit typing from Mongoose models
 * - Built-in validation and error handling
 * - Simpler query syntax
 */

export async function getLists(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // 🎯 FEEDBACK: Implicit Typing
    // Mongoose automatically infers types from the model
    const lists = await List.find().limit(10);

    // 🎯 FEEDBACK: Simple Type Conversion
    // Convert Mongoose documents to API response format
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
    // 🎯 FEEDBACK: Input Validation
    // Use Zod for validation
    const parsedListBody = listSchema.safeParse(request.body);
    if (!parsedListBody.success) {
      const error: CustomError = new Error(parsedListBody.error.message);
      error.status = 400;
      return next(error);
    }

    // 🎯 FEEDBACK: Mongoose Document Creation
    // Use the helper function to create a new list document
    const newList = createListModel(
      parsedListBody.data.name,
      parsedListBody.data.items
    );

    // 🎯 FEEDBACK: Automatic Validation
    // Mongoose validates the document against the schema
    await newList.save();

    // 🎯 FEEDBACK: Simple Response Conversion
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

    // 🎯 FEEDBACK: Mongoose Query
    // Mongoose handles ObjectId validation automatically
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

/**
 * 🎯 FEEDBACK: Additional Handlers
 *
 * With Mongoose, adding new handlers is much simpler.
 * Here are some examples of additional handlers you might want:
 */

export async function getListById(
  request: Request<{ listId: string }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { listId } = request.params;

    // 🎯 FEEDBACK: Mongoose Find by ID
    // Mongoose provides convenient methods like findById
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

    // 🎯 FEEDBACK: Mongoose Update
    // Mongoose provides findByIdAndUpdate for easy updates
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

/**
 * 🎯 FEEDBACK: Key Benefits of Mongoose
 *
 * 1. **Implicit Typing**: TypeScript automatically knows the types
 * 2. **Built-in Validation**: Schema validation happens automatically
 * 3. **Simpler Queries**: Methods like findById, findByIdAndUpdate
 * 4. **Automatic Timestamps**: createdAt and updatedAt are handled automatically
 * 5. **Better Error Handling**: Mongoose provides detailed error messages
 * 6. **Middleware Support**: Easy to add pre/post hooks
 *
 * This makes your code much cleaner and easier to maintain!
 */
