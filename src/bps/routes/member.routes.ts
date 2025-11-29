import { Router } from "express";
import { insertMember,deleteTestData, insertMembersBulk } from "../controllers/member.controller.js";


const router = Router();

router.post("/insert_member", insertMember);
router.delete("/delete_test_data", deleteTestData);
router.post("/bulk_insert",insertMembersBulk)

export default router;