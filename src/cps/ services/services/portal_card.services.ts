import { PortalCardModel } from "../model/portal_card.model.js";
import { BaseService } from "../../utils/base_services.js";

export class PortalCardService extends BaseService<any> {
  constructor() {
    super(PortalCardModel);
  }
}
