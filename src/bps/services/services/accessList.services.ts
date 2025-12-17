import { AccessListModel } from "../model/accessList.model.js";
import { BaseService } from "../../utils/base_services.js";

export class AccessListService extends BaseService<any> {
  constructor() {
    super(AccessListModel);
  }
}
