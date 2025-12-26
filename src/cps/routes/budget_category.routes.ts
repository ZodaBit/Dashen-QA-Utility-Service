import { Router } from "express";
import { BudgetCategoryController } from "../controllers/budget_category.controller.js";

const router = Router();
const controller = BudgetCategoryController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert", controller.bulkInsert);

export default router;
