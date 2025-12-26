import { Router } from "express";
import { AvatarController } from "../controllers/avatar.controller.js";

const router = Router();
const controller = AvatarController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
