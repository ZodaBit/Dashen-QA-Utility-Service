import { Router } from "express";
import { PortalCardController } from "../controllers/portal_card.controller.js";

const router = Router();
const controller = PortalCardController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
