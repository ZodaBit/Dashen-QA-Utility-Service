import { Router } from "express";
import { AdvertController } from "../controllers/advert.controller.js";

const router = Router();
const controller = AdvertController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
