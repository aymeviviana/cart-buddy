import { Router } from "express";
import { getSearchResults } from "../handlers/searchResults.js";

const router = Router();

router.get("/:query", getSearchResults);

export default router;
