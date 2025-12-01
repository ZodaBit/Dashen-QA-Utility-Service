import { Router } from "express";
import { insertTransactionLimits,deleteTestData,deleteTransactionLimitById} from "../controllers/transaction_limits.controller.js";


const router = Router();

router.post("/insert_transaction_limit", insertTransactionLimits);
router.delete("/delete_test_data", deleteTestData);
router.delete("/delete_transaction_limit/:id", deleteTransactionLimitById);

export default router;