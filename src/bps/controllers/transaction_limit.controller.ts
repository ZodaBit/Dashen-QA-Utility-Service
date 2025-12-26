import { TransactionLimitService } from "../services/services/transaction_limit.services.js";
import {BaseController} from "../utils/base_controller.js";

const service = new TransactionLimitService();
export const TransactionLimitController = BaseController(service,"transaction_limits");