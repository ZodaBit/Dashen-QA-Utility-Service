import { AccessListService } from "../services/services/accessList.services.js";
import {BaseController} from "../utils/base_controller.js";

const service = new AccessListService();
export const AccessListController = BaseController(service,"accessList");