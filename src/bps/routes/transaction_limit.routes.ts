import { Router } from "express";
import { TransactionLimitController } from "../controllers/transaction_limit.controller.js";


const router = Router();
const controller = TransactionLimitController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert",controller.bulkInsert) 

export default router;