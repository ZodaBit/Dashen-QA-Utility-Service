import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ITier, ServiceFee } from "../config/types/servicefee";
import {
  CBglEntry,
  IFBproductCodes,
  IIFBglEntry,
  ProductCodes,
} from "../lib/service-shared-types";

const TierSchema = new Schema<ITier>({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  feeAmount: { type: Number, default: 0 },
  paymentType: {
    type: String,
    enum: ["tier percentage", "flat amount"],
  },
});

// Create the schema for ServiceDetails
const serviceDetailsSchema = new Schema<ServiceFee>({
  key: { type: String, required: true },
  serviceCode: { type: String, required: true },
  serviceName: { type: String, required: true },
  singleCap: { type: Number, default: 0 },
  dailyCap: { type: Number, default: 0 },
  minAmount: { type: Number, default: 0 },
  serviceType: {
    type: String,
    enum: ["bill", "transfer"],
  },
  vat: { type: Number, default: 0.15 },
  tiers: {
    type: [TierSchema],
  },
  minAmountVIRTUAL: { type: Number },
  singleCapLevelOne: { type: Number },
  dailyCapLevelOne: { type: Number },
  aboveAmount: { type: Number },
  aboveServiceFee: { type: Number },
  paymentType: {
    type: String,
    enum: ["tier percentage", "flat amount"],
  },
  prefix: { type: String },

  ussdTransactionType: {
    type: String,
    enum: ["DASHEN", "TOPUP", "UTILITY", "WALLET", "OTHER_BANK"],
  },

  USSDEnabled: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },

  dateCreated: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },

  productCodes: ProductCodes,
  IFBproductCodes: IFBproductCodes,
  CBglEntry: CBglEntry,
  IFBglEntry: IIFBglEntry,
});

// Create the schema for Service
serviceDetailsSchema.plugin(mongoosePaginate);

// High-selectivity direct search
serviceDetailsSchema.index({ key: 1 });
serviceDetailsSchema.index({ serviceName: 1 });
serviceDetailsSchema.index({ serviceCode: 1 });

// Basic filters
serviceDetailsSchema.index({ serviceType: 1 });
serviceDetailsSchema.index({ paymentType: 1 });

// Reporting + Filters combined (best performance)
serviceDetailsSchema.index({
  serviceType: 1,
  paymentType: 1,
  dateCreated: -1,
});

serviceDetailsSchema.index({ vat: 1 });

// ARRAY FILTER
serviceDetailsSchema.index({ productCodes: 1 });

const Service = model<
  ServiceFee,
  mongoose.PaginateModel<ServiceFee> & {
    getServiceType(serviceName: string): string;
  }
>("Service", serviceDetailsSchema);
// Export the model
export default Service;
