import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type HQ } from "../config/types/hq";

const Schema = modules.mongoose.Schema;

const HQSchema = new Schema<HQ>({
  name: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  linkedAccounts: [
    {
      accountNumber: { type: String },
      linkedStatus: { type: Boolean },
      linkedDate: { type: Date },
    },
  ],
  totalCap: { type: Number },
  totalCapCreatedAt: { type: Date },
  totalCapUpdatedAt: { type: Date },

  passwordExpiry: { type: Number },
  passwordExpiryCreatedAt: { type: Date },
  passwordExpiryUpdatedAt: { type: Date },

  archiveExpiry: { type: Number },
  archiveExpiryCreatedAt: { type: Date },
  archiveExpiryUpdatedAt: { type: Date },

  totalIndDailyLimit: { type: Number },
  totalIndDailyLimitCreatedAt: { type: Date },
  totalIndDailyLimitUpdatedAt: { type: Date },

  totalCorpDailyLimit: { type: Number },
  totalCorpDailyLimitCreatedAt: { type: Date },
  totalCorpDailyLimitUpdatedAt: { type: Date },

  bankAcctCreateIntervalMins: { type: Number },
  bankAcctCreateIntervalMinsUpdatedAt: { type: Date },
  
  latestiOSVersion: { type: String },
  latestAndroidVersion: { type: String },

  blockTime: { type: Number, default: 90 },
  blockTimeUpdatedAt: { type: Date },

  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

// add mongoose-troop middleware to support pagination
HQSchema.plugin(modules.paginator);

/**
 * Pre save middleware.
 *
 * Sets the date_created and last_modified attributes prior to save
 */
HQSchema.pre<HQ>("save", function preSave(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

const HQModel = modules.mongoose.model<HQ, PaginateModel<HQ>>("HQ", HQSchema,);

export default HQModel;
