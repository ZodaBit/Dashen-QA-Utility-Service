import { Router } from "express";
import { MiniAppController } from "../controllers/mini_app.controller..js";

const router = Router();
const controller = MiniAppController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
