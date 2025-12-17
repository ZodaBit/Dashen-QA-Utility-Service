import { LinkedAccountModel } from "../model/linked_account.modal.js";
import { BaseService } from "../../utils/base_services.js";

export class LinkedAccountService extends BaseService<any> {
  constructor() {
    super(LinkedAccountModel);
  }
}
