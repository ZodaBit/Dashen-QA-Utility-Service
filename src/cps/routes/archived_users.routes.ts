import { Router } from "express";
import { ArchivedUserController } from "../controllers/archived_users.controller.js";

const router = Router();
const controller = ArchivedUserController;

router.post("/insert_archived_user", controller.insertArchivedUsers);
router.delete("/delete_test_data", controller.deleteTestData);
router.post("/bulk_insert", controller.insertArchivedUsersBulk);
router.delete("/delete_archived_user/:account_number", controller.searchArchivedUserAndDelete);

export default router;
