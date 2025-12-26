import { DonationCompanyModel } from "../model/donation_company.model.js";
import { BaseService } from "../../utils/base_services.js";

export class DonationCompanyService extends BaseService<any> {
  constructor() {
    super(DonationCompanyModel);
  }
}
