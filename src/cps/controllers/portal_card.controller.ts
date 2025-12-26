import { PortalCardService } from "../ services/services/portal_card.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new PortalCardService();
export const PortalCardController = BaseController(service, "portal_card");
