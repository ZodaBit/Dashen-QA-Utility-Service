import { Router } from "express";
import { DonationCompanyController } from "../controllers/donation_company.controller.js";

const router = Router();
const controller = DonationCompanyController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
