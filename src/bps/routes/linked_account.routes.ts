import { Router } from "express";
import { LinkedAccountController } from "../controllers/linked_account.controller.js";


const router = Router();
const controller = LinkedAccountController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert",controller.bulkInsert) 

export default router;