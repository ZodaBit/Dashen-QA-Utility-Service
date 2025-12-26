import { BudgetCategoryModel } from "../model/budget_category.model.js";
import { BaseService } from "../../utils/base_services.js";

export class BudgetCategoryService extends BaseService<any> {
  constructor() {
    super(BudgetCategoryModel);
  }
}
