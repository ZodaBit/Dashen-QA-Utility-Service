import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { ObjectId } from "mongodb";
import { Miniapp } from "../config/types/miniapp";
import { ProductCodes } from "../lib/service-shared-types";

const Schema = modules.mongoose.Schema;

const MiniappSchema = new Schema<Miniapp>({
  merchantId: { type: Schema.Types.ObjectId, ref: 'MiniAppMerchant' },
  credentials: {
    uat: {
      merchantAppId: { type: String },
      fabricAppId: { type: String },
      shortCode: { type: String },
      appSecret: { type: String },
      privateKey: { type: String },
      publicKey: { type: String },
    },
    production: {
      merchantAppId: { type: String },
      fabricAppId: { type: String },
      shortCode: { type: String },
      appSecret: { type: String },
      privateKey: { type: String },
      publicKey: { type: String },
    }
  },
  productCode: ProductCodes,
  IFBProductCode: ProductCodes,
  ifbEnabled: { type: Boolean, default: true },
  ifbOrCb: { type: String,enum:["IFB","CB","ALL"]},
  miniappCode: { type: String },
  miniAppIcon: { type: String },
  kycStatus: { type: String, default: "COMPLETE" },
  miniAppName: { type: String },
  miniAppType: { type: String, enum: ["MPAAS", "URL"] },
  isThreeClick: { type: Boolean, default: false },
  isEventMiniApp: { type: Boolean, default: false },
  mpaasAppId: {
    uat: { type: String },
    production: { type: String },
  },
  url: {
    uat: { type: String },
    production: { type: String },
  },
  stage: { type: String, default: "UAT" },

  enabled: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
  commissionGLAccount: { type: String },
  miniappCategory: { type: Schema.Types.ObjectId, ref: "MiniappCategory" },
});

// add mongoose-troop middleware to support pagination
MiniappSchema.plugin(modules.paginator);

MiniappSchema.pre<Miniapp>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

const MiniappModel = modules.mongoose.model<Miniapp, PaginateModel<Miniapp>>(
  "MiniApp",
  MiniappSchema
);

// Expose the User Model
export default MiniappModel;
