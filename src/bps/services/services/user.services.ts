import { UserModel } from "../model/user.model.js";
import { BaseService } from "../../utils/base_services.js";

export class UserService extends BaseService<any> {
  constructor() {
    super(UserModel);
  }
}
