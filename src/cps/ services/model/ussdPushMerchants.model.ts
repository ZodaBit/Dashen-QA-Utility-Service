import { USSDPushMerchant } from "../config/types/ussdPushMerchant";
import modules from "./imports/index";
import mongoose from "mongoose";
import { type PaginateModel } from "mongoose";

const Schema = mongoose.Schema;
const productCodes = {
  PRD: { type: String },
  VATPRD: { type: String },
  SFPRD: { type: String },
  TRXN: { type: String },
};
const glEntry = {
  productAccount: { type: String },
  productBranchCode: { type: String },
  serviceAccount: { type: String },
  serviceBranchCode: { type: String },
  vatAccount: { type: String },
  vatBranchCode: { type: String },
};
const tiers = [
  {
    min: { type: Number },
    max: { type: Number },
    feeAmount: { type: Number },
    paymentType: {
      type: String,
      enum: ["tier percentage", "flat amount"],
    },
  },
];
const USSDPushMerchantsSchema = new Schema<USSDPushMerchant>(
  {
    merchantCode: { type: String, unique: true },
    merchantName: { type: String },
    username: { type: String },
    password: { type: String },
    type: {
      type: String,
      enum: ["DIRECT", "CHANNEL", "MULTICHANNEL"],
    },
    singleLimit: { type: Number },
    dailyLimit: { type: Number },
    minimumCap: { type: Number },
    CBGlEntry: glEntry,
    IFBGlEntry: glEntry,
    IFBProductCodes: productCodes,
    CBProductCodes: productCodes,
    tiers: tiers,
    aboveAmount: { type: Number },
    aboveServiceFee: { type: Number },
    abovePaymentType: {
      type: String,
      enum: ["tier percentage", "flat amount"],
    },
    narrative: { type: String, default: "" },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// add mongoose-troop middleware to support pagination
USSDPushMerchantsSchema.plugin(modules.paginator);

// Create the Model
const USSDPushMerchantsModel = mongoose.model<
  USSDPushMerchant,
  PaginateModel<USSDPushMerchant>
>("USSDPushMerchants", USSDPushMerchantsSchema);

// Export the LDAPActions model
export default USSDPushMerchantsModel;
