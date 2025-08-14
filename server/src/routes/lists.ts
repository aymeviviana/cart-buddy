import { Router } from "express";
import {
  deleteList,
  getLists,
  createList,
  createItem,
  deleteItem,
} from "../handlers/lists.js";

const router = Router();

router.get("/", getLists);

router.post("/", createList);

router.delete("/:listId", deleteList);

router.post("/:listId/items", createItem);

router.delete("/:listId/items/:barcode", deleteItem);

// router.get("/:listId", getListById);

export default router;
