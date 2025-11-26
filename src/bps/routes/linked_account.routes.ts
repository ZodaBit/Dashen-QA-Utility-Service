import { Router } from "express";
import { insertLinkedAccount,deleteTestData } from "../controllers/linked_account.controller.js";


const router = Router();

router.post("/insert_linked_account", insertLinkedAccount);
router.delete("/delete_test_data", deleteTestData);

export default router;