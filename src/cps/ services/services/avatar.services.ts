import { AvatarModel } from "../model/avatar.model.js";
import { BaseService } from "../../utils/base_services.js";

export class AvatarService extends BaseService<any> {
  constructor() {
    super(AvatarModel);
  }
}
