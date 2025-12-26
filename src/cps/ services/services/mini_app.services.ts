import { MiniAppModel } from "../model/mini_app.model.js";
import { BaseService } from "../../utils/base_services.js";

export class MiniAppService extends BaseService<any> {
  constructor() {
    super(MiniAppModel);
  }
}
