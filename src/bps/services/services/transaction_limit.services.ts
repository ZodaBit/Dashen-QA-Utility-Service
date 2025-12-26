import { TransactionLimitModel } from "../model/transaction_limit.model.js";
import { BaseService } from "../../utils/base_services.js";

export class TransactionLimitService extends BaseService<any> {
  constructor() {
    super(TransactionLimitModel);
  }
}