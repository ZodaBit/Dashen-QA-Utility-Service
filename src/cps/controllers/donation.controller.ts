import { DonationService } from "../ services/services/donation.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new DonationService();
export const DonationController = BaseController(service, "donation");
