import { Bank } from "../config/types/bank";
import modules from "./imports/index";
import { type PaginateModel } from "mongoose";

const Schema = modules.mongoose.Schema;

const OtbankSchema = new Schema(
  {
    bankName: { type: String },
    bankLogo: { type: String },
    bankCode: { type: String },
    bankBCI: { type: String },
    IPSBank: { type: Boolean, default: false },
    IPSEnabled: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
// add mongoose-troop middleware to support pagination
OtbankSchema.plugin(modules.paginator);

const OtbankModel = modules.mongoose.model<Bank, PaginateModel<Bank>>(
  "Otbank",
  OtbankSchema
);

export default OtbankModel;
