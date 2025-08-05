import { Router } from "express";
import {
  deleteList,
  getLists,
  createList,
  getListById,
  updateList,
} from "../handlers/lists.js";

const router = Router();

router.get("/", getLists);

router.post("/", createList);

router.delete("/:listId", deleteList);

// router.get("/:listId", getListById);
// router.put("/:listId", updateList);

export default router;