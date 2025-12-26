import AdvertModel from "../model/advert.model.js";
import { BaseService } from "../../utils/base_services.js";

export class AdvertService extends BaseService<any> {
  constructor() {
    super(AdvertModel);
  }
}
