import { BudgetCategoryService } from "../ services/services/budget_category.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new BudgetCategoryService();
export const BudgetCategoryController = BaseController(service, "budget_category");
