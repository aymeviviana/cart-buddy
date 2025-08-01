import { NextFunction, Request, Response } from "express";
import db from "../db/conn.js";
import { Collection, DeleteResult, InsertOneResult, ObjectId, WithId } from "mongodb";
import { CreateListDto } from "../dtos/CreateList.dto.js";
import { CustomError } from "../types/customError.js";
import { SingleListQuery } from "../types/queries.js";

export async function getLists(
  request: Request,
  response: Response,
  next: NextFunction
) { 
  if (!db) {
    const error = new Error("Database connection is not available.");
    return next(error);
  }
  
  try {
    let collection: Collection<Document> = db.collection("lists");
    let results: WithId<Document>[] = await collection.find({})
      .limit(10)
      .toArray();
    response.status(200).send(results);
  } catch (error: unknown) {
    return next(error); 
  }
}

export async function createList(
  request: Request<{}, {}, CreateListDto>,
  response: Response,
  next: NextFunction
) { 
  if (!db) {
    const error = new Error("Database connection is not available.");
    return next(error);
  }

  const name: string = request.body.name.trim();

  if (name.length === 0) { 
    const error: CustomError = new Error("List name must contain at least one character");
    error.status = 400;
    return next(error);
  }

  const collection: Collection<Document> = db.collection("lists");

  try {
    const result: InsertOneResult<Document> = await collection.insertOne(request.body as any);
    
    if (!result.acknowledged) { 
      throw new Error(`List was not created. Please try again.`);
    }

    const listId: ObjectId = result.insertedId;
    const query: SingleListQuery = { _id: listId };
    const newList: WithId<Document> | null = await collection.findOne(query); 
    
    if (!newList) { 
      throw new Error(`List not found. Please try again.`);
    }

    response.status(201).send(newList);
  } catch (error: unknown) {
    return next(error);
  }
}

export async function deleteList(
  request: Request<{listId: string}>,
  response: Response,
  next: NextFunction
) { 
  if (!db) {
    const error = new Error("Database connection is not available.");
    return next(error);
  }

  const id: string = request.params.listId;
  const query: SingleListQuery = { _id: new ObjectId(id) };
  const collection = db.collection("lists");
  
  try {
    const result: DeleteResult = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      const error: CustomError = new Error("List was not found. Please try again.");
      error.status = 404;
      throw error;
    }

    response.status(200).send({ _id: id});  
  } catch (error) {
    return next(error);
  }
}