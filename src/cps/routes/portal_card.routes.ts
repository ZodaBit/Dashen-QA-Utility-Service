import { Router } from "express";
import { insert,deleteTestData,bulkInsert } from "../controllers/portal_card.controller.js";

const router = Router();

router.post("/insert", insert);
router.delete("/delete_test_data", deleteTestData);
router.post("/bulk_insert",bulkInsert)

export default router;