/**
 * Load Module Dependencies.
 */
import { type PaginateModel } from "mongoose";
import modelImports from "./imports";

import { type InApp } from "../config/types/inapp";

const { mongoose, paginator } = modelImports;

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const InAppSchema = new Schema<InApp>({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  notificationType: {
    type: String,
    // enum: [
    //   "Payment Successul",
    //   "Money Received",
    //   "Mobile Top-Up Successful",
    //   "Wallet Loaded",
    //   "Money Request Sent",
    //   "Money Request Received",
    //   "Budget Exceeded",
    //   "New Loan Approved",
    //   "Loan Payment Successful",
    //   "Loan Payment Due",
    //   "Payment Failed",
    //   "Transaction Failed",
    //   "New Device Login Attempt Detected",
    // ],
  },
  notificationBody: { type: String },
  isPublic: { type: Boolean, default: false },
  for: { type: String, enum: ["IFB", "CB", "ALL"] },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  notificationParts: { type: Object },
  seen: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

/**
 * Model attributes to expose
 */

InAppSchema.pre("save", function (next) {
  let now = new Date();

  this.lastModified = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});
// add mongoose-troop middleware to support pagination
InAppSchema.plugin(paginator);

// Expose the User Model
const InAppModel = mongoose.model<InApp, PaginateModel<InApp>>(
  "InApp",
  InAppSchema
);
export default InAppModel;
