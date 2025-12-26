import { AdvertService } from "../ services/services/Advert.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new AdvertService();
export const AdvertController = BaseController(service, "advert");
