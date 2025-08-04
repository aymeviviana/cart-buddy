/**
 * 🎯 FEEDBACK: Mongoose Examples
 *
 * This file demonstrates how much simpler and cleaner Mongoose makes your code
 * compared to the MongoDB SDK. Notice the implicit typing and simpler syntax.
 */

import { List, IList, IItem } from "../models/List.js";

/**
 * Example 1: Simple Queries with Implicit Typing
 *
 * Notice how TypeScript automatically knows the types without explicit declarations.
 */
async function exampleSimpleQueries() {
  // ✅ Mongoose automatically infers types
  const lists = await List.find(); // TypeScript knows this is IList[]

  // ✅ Autocomplete works perfectly
  lists.forEach((list) => {
    console.log(list.name); // ✅ TypeScript knows this is string
    console.log(list.createdAt); // ✅ TypeScript knows this is Date
    console.log(list.items); // ✅ TypeScript knows this is IItem[]

    // ✅ TypeScript provides autocomplete for items
    list.items.forEach((item) => {
      console.log(`- ${item.name} (${item.brand})`);
    });
  });
}

/**
 * Example 2: Creating Documents
 *
 * Mongoose makes document creation much simpler.
 */
async function exampleCreateDocument() {
  // ✅ Simple document creation
  const newList = new List({
    name: "Shopping List",
    items: [
      { barcode: "123456789", name: "Milk", brand: "Organic Valley" },
      { barcode: "987654321", name: "Bread", brand: "Wonder" },
    ],
  });

  // ✅ Automatic validation and saving
  await newList.save();

  console.log("Created list with ID:", newList._id);
}

/**
 * Example 3: Finding Documents
 *
 * Mongoose provides convenient methods for common operations.
 */
async function exampleFindDocuments() {
  // ✅ Find by ID (handles ObjectId conversion automatically)
  const list = await List.findById("some-id");

  // ✅ Find with conditions
  const shoppingLists = await List.find({ name: /shopping/i });

  // ✅ Find one document
  const firstList = await List.findOne({ name: "Shopping List" });

  // ✅ Count documents
  const count = await List.countDocuments({ name: /list/i });

  console.log(`Found ${count} lists with "list" in the name`);
}

/**
 * Example 4: Updating Documents
 *
 * Mongoose provides several ways to update documents.
 */
async function exampleUpdateDocuments() {
  // ✅ Update by ID
  const updatedList = await List.findByIdAndUpdate(
    "some-id",
    { name: "Updated List Name" },
    { new: true } // Return the updated document
  );

  // ✅ Update with conditions
  await List.updateMany({ name: /old/i }, { name: "Updated Name" });

  // ✅ Find and update
  const list = await List.findOne({ name: "Shopping List" });
  if (list) {
    list.name = "New Name";
    await list.save();
  }
}

/**
 * Example 5: Deleting Documents
 *
 * Simple deletion with Mongoose.
 */
async function exampleDeleteDocuments() {
  // ✅ Delete by ID
  const deletedList = await List.findByIdAndDelete("some-id");

  // ✅ Delete with conditions
  const result = await List.deleteMany({ name: /test/i });

  console.log(`Deleted ${result.deletedCount} documents`);
}

/**
 * Example 6: Schema Validation
 *
 * Mongoose automatically validates documents against the schema.
 */
async function exampleValidation() {
  try {
    // ❌ This will fail validation (name is required)
    const invalidList = new List({
      items: [{ barcode: "123", name: "Item", brand: "Brand" }],
    });
    await invalidList.save();
  } catch (error) {
    console.log("Validation error:", error.message);
  }

  try {
    // ❌ This will fail validation (name must be at least 1 character)
    const invalidList2 = new List({
      name: "",
      items: [],
    });
    await invalidList2.save();
  } catch (error) {
    console.log("Validation error:", error.message);
  }
}

/**
 * Example 7: Aggregation (Advanced)
 *
 * Mongoose supports MongoDB aggregation with a clean API.
 */
async function exampleAggregation() {
  // ✅ Simple aggregation
  const result = await List.aggregate([
    { $match: { name: /shopping/i } },
    { $unwind: "$items" },
    { $group: { _id: "$items.brand", count: { $sum: 1 } } },
  ]);

  console.log("Items by brand:", result);
}

/**
 * 🎯 FEEDBACK: Key Benefits Demonstrated
 *
 * 1. **Implicit Typing**: No need for explicit type declarations
 * 2. **Simpler Syntax**: Methods like findById instead of find({ _id: ... })
 * 3. **Automatic Validation**: Schema validation happens automatically
 * 4. **Better Error Messages**: Mongoose provides detailed error information
 * 5. **Built-in Features**: Timestamps, middleware, hooks, etc.
 * 6. **Type Safety**: Full TypeScript support with autocomplete
 *
 * This makes your code much more readable and maintainable!
 */

export {
  exampleSimpleQueries,
  exampleCreateDocument,
  exampleFindDocuments,
  exampleUpdateDocuments,
  exampleDeleteDocuments,
  exampleValidation,
  exampleAggregation,
};
