import { AvatarService } from "../ services/services/avatar.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new AvatarService();
export const AvatarController = BaseController(service, "avatar");
