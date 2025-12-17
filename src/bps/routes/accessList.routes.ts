import { Router } from "express";
import { AccessListController} from "../controllers/accessList.controller.js";

const router = Router();
const controller = AccessListController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert",controller.bulkInsert)

export default router;
