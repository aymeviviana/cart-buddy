import { Router } from "express";
import { deleteList, getLists } from "../handlers/lists.js";
import { createList } from "../handlers/lists.js";

const router = Router();

router.get("/", getLists);

router.post("/", createList);

router.delete("/:listId", deleteList);

export default router;