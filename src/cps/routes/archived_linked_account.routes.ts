import { Router } from "express";
import { ArchivedLinkedAccountController } from "../controllers/archived_linked_account.controller.js";

const router = Router();
const controller = ArchivedLinkedAccountController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);
router.delete("/delete_archived_account/:account_number", controller.searchAccountAndDelete);

export default router;
