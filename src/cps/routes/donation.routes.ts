import { Router } from "express";
import { DonationController } from "../controllers/donation.controller.js";

const router = Router();
const controller = DonationController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
