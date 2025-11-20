import { Router } from "express";
import { insertAccount,deleteAccount } from "../controllers/account.controller.js";

const router = Router();

router.post("/insert_account", insertAccount);
router.delete("/delete_test_data", deleteAccount);

export default router;