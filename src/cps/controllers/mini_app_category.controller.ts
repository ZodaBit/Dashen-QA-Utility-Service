import { MiniAppCategoryService } from "../ services/services/mini_app_category.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new MiniAppCategoryService();
export const MiniAppCategoryController = BaseController(service, "mini_app_category");
