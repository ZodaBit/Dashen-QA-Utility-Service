import { DonationCategoryModel } from "../model/donation_category.model.js";
import { BaseService } from "../../utils/base_services.js";

export class DonationCategoryService extends BaseService<any> {
  constructor() {
    super(DonationCategoryModel);
  }
}
