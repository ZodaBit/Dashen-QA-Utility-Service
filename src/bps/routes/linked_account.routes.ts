import { Router } from "express";
import { insertLinkedAccount,deleteTestData,searchLinkedAccountDelete,insertLinkedAccountBulk} from "../controllers/linked_account.controller.js";


const router = Router();

router.post("/insert_linked_account", insertLinkedAccount);
router.delete("/delete_test_data", deleteTestData);
router.delete("/delete_linked_account/:account_number", searchLinkedAccountDelete);
router.post("/bulk_insert",insertLinkedAccountBulk)

export default router;