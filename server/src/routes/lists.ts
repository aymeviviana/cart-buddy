import { Router } from "express";
import {
  deleteList,
  getLists,
  createList,
  getListById,
  updateList,
} from "../handlers/lists.js";

/**
 * 🎯 FEEDBACK: Route Organization
 *
 * With Mongoose, we can easily add more routes since the handlers are simpler.
 * This gives you a complete CRUD API with minimal code.
 */

const router = Router();

// GET /api/v1/lists - Get all lists
router.get("/", getLists);

// GET /api/v1/lists/:listId - Get a specific list
router.get("/:listId", getListById);

// POST /api/v1/lists - Create a new list
router.post("/", createList);

// PUT /api/v1/lists/:listId - Update a list
router.put("/:listId", updateList);

// DELETE /api/v1/lists/:listId - Delete a list
router.delete("/:listId", deleteList);

export default router;
