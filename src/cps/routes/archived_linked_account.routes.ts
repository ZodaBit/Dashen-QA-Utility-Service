import { Router } from "express";
import { insert,deleteTestData,bulkInsert ,searchAccountAndDelete} from "../controllers/archived_linked_account.controller.js";



const router = Router();

router.post("/insert", insert);
router.delete("/delete_test_data", deleteTestData);
router.post("/bulk_insert",bulkInsert)
router.delete("/delete_archived_account/:account_number", searchAccountAndDelete);

export default router;