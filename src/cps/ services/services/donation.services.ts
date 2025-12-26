import { DonationModel } from "../model/donation.model.js";
import { BaseService } from "../../utils/base_services.js";

export class DonationService extends BaseService<any> {
  constructor() {
    super(DonationModel);
  }
}
