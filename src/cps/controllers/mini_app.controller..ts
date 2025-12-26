import { MiniAppService } from "../ services/services/mini_app.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new MiniAppService();
export const MiniAppController = BaseController(service, "mini_app");
