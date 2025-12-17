import { UserService } from "../services/services/user.services.js";
import {BaseController} from "../utils/base_controller.js";

const service = new UserService();
export const UserController = BaseController(service,"users");