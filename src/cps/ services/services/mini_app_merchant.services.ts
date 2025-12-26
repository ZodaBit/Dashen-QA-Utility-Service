import { MiniAppMerchantModel } from "../model/mini_app_merchant.model.js";
import { BaseService } from "../../utils/base_services.js";

export class MiniAppMerchantService extends BaseService<any> {
  constructor() {
    super(MiniAppMerchantModel);
  }
}
