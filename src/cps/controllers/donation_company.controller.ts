import { DonationCompanyService } from "../ services/services/donation_company.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new DonationCompanyService();
export const DonationCompanyController = BaseController(service, "donation_company");
