import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ITier, ServiceFee } from "../config/types/servicefee";
import { CBglEntry, IFBproductCodes, IIFBglEntry, ProductCodes } from "../lib/service-shared-types";

const TierSchema = new Schema<ITier>({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  feeAmount: { type: Number, default: 0 },
  paymentType: {
    type: String,
    enum: ["tier percentage", "flat amount"],
  }
});

// Create the schema for USSDService
const USSDServiceSchema = new Schema<ServiceFee>({
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
  prefix: { type: String },

  USSDEnabled: { type: Boolean, default: true },
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

// Create the schema for USSDService
USSDServiceSchema.plugin(mongoosePaginate);

const USSDService = model<
  ServiceFee,
  mongoose.PaginateModel<ServiceFee> & {
    getServiceType(serviceName: string): string;
  }
>("USSDService", USSDServiceSchema);
// Export the model
export default USSDService;
