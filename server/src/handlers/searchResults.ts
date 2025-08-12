import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import { IItem } from "../models/List.js";
import { CHOMP_API_BRANDED_ITEMS_BY_NAME } from "../constants.js";
import { ErrorResponseMessage } from "../types/api.js";
import { LIMIT } from "../constants.js";
import { CustomError } from "../types/customError.js";

//   {
//     barcode: "AAA",
//     name: "Oat Milk",
//     brand: "Oatly",
//   },
//   {
//     barcode: "BBB",
//     name: "Penne Pasta",
//     brand: "Barilla",
//   },
//   {
//     barcode: "CCC",
//     name: "Crunchy Peanut Butter",
//     brand: "Jiff",
//   },
// ];
const API_KEY = process.env.API_KEY || "ABC";

function formatItems(data) {
  return data.items.map(({ barcode, name, brand }) => ({
    barcode,
    name,
    brand,
  }));
}

function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Invalid request. Please try again.";
      break;
    case 401:
      return "Please wait a few seconds and then try again!";
      break;
    case 404:
      return "Sorry! No food items were found. Please try a new search.";
      break;
    case 500:
      return "Oops! Server error. Please try again.";
      break;
    default:
      return "Encountered an error. Please try again.";
      break;
  }
}

async function getItems(query: string, response: Response, next: NextFunction) {
  try {
    const apiResponse = await fetch(
      `${CHOMP_API_BRANDED_ITEMS_BY_NAME}?name=${query}&limit=${LIMIT}&api_key=${API_KEY}`
    );
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      const errorMessage: string = getErrorMessage(apiResponse.status);
      const error: CustomError = new Error(errorMessage);
      error.status = apiResponse.status;
      return next(error);
    }

    const formattedItems = formatItems(data);
    response.status(200).send(formattedItems);
  } catch (error) {
    return next(error);
  }
}

export async function getSearchResults(
  request: Request<{ query: string }>,
  response: Response,
  next: NextFunction
) {
  const query: string = request.params.query;
  getItems(query, response, next);
}
