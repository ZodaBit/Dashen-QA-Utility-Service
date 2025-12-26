import { NotificationModel } from "../model/notifications.model.js";
import { BaseService } from "../../utils/base_services.js";

export class NotificationService extends BaseService<any> {
  constructor() {
    super(NotificationModel);
  }
}
