import { Router } from "express";
import { NotificationController } from "../controllers/notifications.controller.js";

const router = Router();
const controller = NotificationController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
