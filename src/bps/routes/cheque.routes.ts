import { Router } from "express";
import { insertCheque,deleteTestData } from "../controllers/cheque.controller.js";

const router = Router();

router.post("/insert_cheque", insertCheque);
router.delete("/delete_test_data", deleteTestData);

export default router;