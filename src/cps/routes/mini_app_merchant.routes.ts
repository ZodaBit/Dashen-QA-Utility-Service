import { Router } from "express";
import { MiniAppMerchantController } from "../controllers/mini_app_merchant.controller.js";

const router = Router();
const controller = MiniAppMerchantController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
