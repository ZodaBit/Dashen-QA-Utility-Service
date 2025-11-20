import { Router } from "express";
import { insertMember,deleteTestData } from "../controllers/member.controller.js";


const router = Router();

router.post("/insert_member", insertMember);
router.delete("/delete_test_data", deleteTestData);

export default router;