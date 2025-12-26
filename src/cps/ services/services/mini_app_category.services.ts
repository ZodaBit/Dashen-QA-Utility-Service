import { MiniAppCategoryModel } from "../model/mini_app_categories.model.js";
import { BaseService } from "../../utils/base_services.js";

export class MiniAppCategoryService extends BaseService<any> {
  constructor() {
    super(MiniAppCategoryModel);
  }
}
