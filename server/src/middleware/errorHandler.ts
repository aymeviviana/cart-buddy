import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/customError.js";

const errorHandler = (error: CustomError, request: Request, response: Response, next: NextFunction) => { 
  if ("status" in error) {
    response.status(error.status || 500).send({message: error.message});
  }
  next();
};

export default errorHandler;