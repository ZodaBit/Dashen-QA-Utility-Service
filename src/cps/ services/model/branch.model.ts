import modules from "./imports/index";

import { type PaginateModel } from "mongoose";
import { type Branch } from "../config/types/branch";

const Schema = modules.mongoose.Schema;

const BranchSchema = new Schema<Branch>({
  branchCode: { type: String },
  branchName: { type: String },
  districtCode: { type: String },
  districtName: { type: String },
  branchRegion: { type: String },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },

},
  {
    timestamps: true,
  }
);

BranchSchema.plugin(modules.paginator);

const branchModel = modules.mongoose.model<Branch, PaginateModel<Branch>>(
  "Branch",
  BranchSchema
);

export default branchModel;
