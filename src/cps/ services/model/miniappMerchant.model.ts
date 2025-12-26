import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { MiniAppMerchant } from "../config/types/miniappMerchant";
import { MiniappMerchantSettlementMethod } from "../utils/enums/miniappMerchant.enum";

const Schema = modules.mongoose.Schema;

const MiniAppMerchantSchema = new Schema<MiniAppMerchant>({
  merchantCode: { type: String },
  merchantName: { type: String },
  merchantType: { type: String },
  miniappMerchantType: { type: Schema.Types.ObjectId, ref: "MiniappProduct" },
  kyc: {
    status: {
      type: String,
      default: "COMPLETE",
      enum: ["PENDING", "COMPLETE", "REJECTED"],
    },
    representative: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  },
  bankAccountNumber: { type: String },
  branches: [
    {
      branchCode: { type: String },
      branchName: { type: String },
      branchAddress: { type: String },
      branchOwner: { type: String },
      branchAccountNumber: { type: String },
    },
  ],
  email: { type: String },
  phoneNumber: { type: String },
  miniApps: [{ type: Schema.Types.ObjectId, ref: "MiniApp" }],
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
  settlementMethod: {type: String, enum: MiniappMerchantSettlementMethod},
  eventMerchantLogo: { type: String },
});

// add mongoose-troop middleware to support pagination
MiniAppMerchantSchema.plugin(modules.paginator);

MiniAppMerchantSchema.pre<MiniAppMerchant>(
  "save",
  function preSaveMiddleware(next) {
    const now = modules.moment().toDate();

    this.createdAt = now;
    this.lastModified = now;

    next();
  }
);

// High-selectivity single indexes
MiniAppMerchantSchema.index({ merchantCode: 1 });
MiniAppMerchantSchema.index({ phoneNumber: 1 });
MiniAppMerchantSchema.index({ bankAccountNumber: 1 });
MiniAppMerchantSchema.index({ merchantName: 1 });

// Core filtering
MiniAppMerchantSchema.index({ merchantType: 1 });

// Date & report compound index
MiniAppMerchantSchema.index({ merchantType: 1, createdAt: -1 });

// General list & pagination
MiniAppMerchantSchema.index({ createdAt: -1 });

// Soft delete optimization
MiniAppMerchantSchema.index({ isDeleted: 1, createdAt: -1 });

const MiniAppMerchantModel = modules.mongoose.model<
  MiniAppMerchant,
  PaginateModel<MiniAppMerchant>
>("MiniAppMerchant", MiniAppMerchantSchema);

// Expose the User Model
export default MiniAppMerchantModel;