import mongoose from "mongoose";
import ArchivedUserModel from "../model/archiveduser.model.js";
import { BaseService } from "../../utils/base_services.js";

export class ArchivedUserService extends BaseService<any> {
  constructor() {
    super(ArchivedUserModel);
  }

  public async searcheArchivedUser(account_number: string): Promise<any> {
    try {
      const doc = await ArchivedUserModel.findOne({ account_number }, { _id: 1 });
      return doc?._id?.toString() || null;
    } catch (err) {
      throw err;
    }
  }

  deleteArchivedUserById(id: string): Promise<any> {
    try {
      return ArchivedUserModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    } catch (err) {
      throw err;
    }
  }
}
