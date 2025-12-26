import { MiniAppMerchantService } from "../ services/services/mini_app_merchant.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new MiniAppMerchantService();
export const MiniAppMerchantController = BaseController(service, "mini_app_merchant");
