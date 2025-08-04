/**
 * 🎯 FEEDBACK: Usage Examples
 *
 * This file demonstrates how to use the improved handlers and shows
 * the benefits of proper TypeScript typing and MongoDB models.
 */

import { getDatabase } from "../db/conn.js";
import { List, createListDocument } from "../models/List.js";
import { Collection } from "mongodb";

/**
 * Example 1: Type-Safe Database Operations
 *
 * Notice how TypeScript now provides autocomplete and type checking
 * for all database operations.
 */
async function exampleTypeSafeOperations() {
  const db = await getDatabase();
  const collection: Collection<List> = db.collection("lists");

  // ✅ TypeScript knows the structure of your documents
  const lists: List[] = await collection.find({}).toArray();

  // ✅ Autocomplete works for List properties
  lists.forEach((list) => {
    console.log(list.name); // ✅ TypeScript knows this is a string
    console.log(list.createdAt); // ✅ TypeScript knows this is a Date
    console.log(list.items); // ✅ TypeScript knows this is Item[]

    // ❌ This would cause a TypeScript error:
    // console.log(list.invalidProperty); // Property 'invalidProperty' does not exist
  });
}

/**
 * Example 2: Creating Documents with Helper Functions
 *
 * Using helper functions ensures consistent document structure
 * and reduces the chance of errors.
 */
async function exampleCreateDocument() {
  const db = await getDatabase();
  const collection: Collection<List> = db.collection("lists");

  // ✅ Using helper function ensures proper structure
  const newList = createListDocument("Shopping List", [
    { barcode: "123456789", name: "Milk", brand: "Organic Valley" },
    { barcode: "987654321", name: "Bread", brand: "Wonder" },
  ]);

  // ✅ TypeScript ensures we're inserting the correct structure
  const result = await collection.insertOne(newList as List);

  console.log("Created list with ID:", result.insertedId);
}

/**
 * Example 3: Query with Type Safety
 *
 * Type-safe queries prevent errors and provide better IDE support.
 */
async function exampleTypeSafeQueries() {
  const db = await getDatabase();
  const collection: Collection<List> = db.collection("lists");

  // ✅ TypeScript knows the query structure
  const query = { name: "Shopping List" };

  // ✅ TypeScript knows the result type
  const list: List | null = await collection.findOne(query);

  if (list) {
    // ✅ TypeScript provides autocomplete for all properties
    console.log(`Found list: ${list.name} with ${list.items.length} items`);

    // ✅ TypeScript knows items is an array of Item objects
    list.items.forEach((item) => {
      console.log(`- ${item.name} (${item.brand})`);
    });
  }
}

/**
 * Example 4: Error Handling with Proper Types
 *
 * Proper error handling with TypeScript ensures you handle all cases.
 */
async function exampleErrorHandling() {
  try {
    const db = await getDatabase();
    const collection: Collection<List> = db.collection("lists");

    // ✅ TypeScript ensures we handle the null case
    const list = await collection.findOne({ _id: "invalid-id" });

    if (!list) {
      // ✅ TypeScript knows list is null here
      console.log("List not found");
      return;
    }

    // ✅ TypeScript knows list is List here (not null)
    console.log("Found list:", list.name);
  } catch (error) {
    // ✅ TypeScript helps with error handling
    if (error instanceof Error) {
      console.error("Database error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

/**
 * Example 5: Benefits of Model vs DTO Separation
 *
 * This shows why separating models and DTOs is important.
 */
function exampleModelDtoSeparation() {
  // Database model (what's stored in MongoDB)
  const dbList: List = {
    _id: new (require("mongodb").ObjectId)(),
    name: "Shopping List",
    items: [{ barcode: "123", name: "Milk", brand: "Organic" }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // API response DTO (what's sent to client)
  const apiResponse = {
    _id: dbList._id.toString(), // Convert ObjectId to string
    name: dbList.name,
    items: dbList.items,
    createdAt: dbList.createdAt.toISOString(), // Convert Date to string
    updatedAt: dbList.updatedAt.toISOString(),
  };

  console.log("Database model:", dbList);
  console.log("API response:", apiResponse);
}

/**
 * 🎯 FEEDBACK: Key Takeaways
 *
 * 1. TypeScript provides compile-time safety for database operations
 * 2. Models ensure consistent data structure
 * 3. Helper functions reduce boilerplate and errors
 * 4. Proper error handling prevents runtime crashes
 * 5. DTOs keep your API contract clean and stable
 *
 * These patterns will make your code more maintainable and less error-prone!
 */

export {
  exampleTypeSafeOperations,
  exampleCreateDocument,
  exampleTypeSafeQueries,
  exampleErrorHandling,
  exampleModelDtoSeparation,
};
