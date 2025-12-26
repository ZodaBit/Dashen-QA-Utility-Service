import { DonationCategoryService } from "../ services/services/donation_category.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new DonationCategoryService();
export const DonationCategoryController = BaseController(service, "donation_category");
