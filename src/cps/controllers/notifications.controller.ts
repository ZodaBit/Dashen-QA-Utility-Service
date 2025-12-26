import { NotificationService } from "../ services/services/notifications.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new NotificationService();
export const NotificationController = BaseController(service, "notifications");
