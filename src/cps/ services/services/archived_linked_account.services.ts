import mongoose from "mongoose";
import ArchivedLinkedAccountModel from "../model/archive-linked-account.model.js";
import { BaseService } from "../../utils/base_services.js";

export class ArchivedLinkedAccountService extends BaseService<any> {
  constructor() {
    super(ArchivedLinkedAccountModel);
  }

  public async searchArchivedAccount(account_number: string): Promise<any> {
    try {
      const doc = await ArchivedLinkedAccountModel.findOne({ account_number }, { _id: 1 });
      return doc?._id?.toString() || null;
    } catch (err) {
      throw err;
    }
  }

  deleteArchivedAccountById(id: string): Promise<any> {
    try {
      return ArchivedLinkedAccountModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    } catch (err) {
      throw err;
    }
  }
}
