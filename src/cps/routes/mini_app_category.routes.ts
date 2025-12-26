import { Router } from "express";
import { MiniAppCategoryController } from "../controllers/mini_app_category.controller.js";

const router = Router();
const controller = MiniAppCategoryController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
