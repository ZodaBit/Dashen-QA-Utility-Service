import { LinkedAccountService } from "../services/services/linked_account.services.js";
import {BaseController} from "../utils/base_controller.js";

const service = new LinkedAccountService();
export const LinkedAccountController = BaseController(service,"linked_account");