import { Router } from "express";
import { insertArchivedUsers,insertArchivedUsersBulk,deleteTestData,searchArchivedUserAndDelete } from "../controllers/archived_users.controller.js";



const router = Router();

router.post("/insert_archived_user", insertArchivedUsers);
router.delete("/delete_test_data", deleteTestData);
router.post("/bulk_insert",insertArchivedUsersBulk)
router.delete("/delete_archived_user/:account_number", searchArchivedUserAndDelete);

export default router;