import { LDAPAction } from "../config/types/ldapaction";
import modules from "./imports/index";
import mongoose, { Document, PaginateModel, Schema } from "mongoose";

// Define an interface for the LDAP Action
interface ILDAPAction extends Document {
  checkeruser?: string;
  makeruser?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestAction:
  | "LINK_ACCOUNT"
  | "UNLINK_ACCOUNT"
  | "RESET_PIN"
  | "UNLINK_DEVICE"
  | "CHANGE_PHONE_NUMBER"
  | "CHANGE_NAME"
  | "REJECT_ACCOUNT"
  | "DISABLE_USER"
  | "ENABLE_USER"
  | "ACTIVATE_ACCOUNT"
  | "DETACH_PHONE_NUMBER"
  | "ATTACH_PHONE_NUMBER"
  | "ADD_ACCOUNT"
  | "LINK_ANDOR_ACCOUNT"
  | "CHANGE_EMAIL"
  | "UPDATE_LIMIT"
  | "UPDATE_ONE_LIMIT"
  | "ACCESS_CONTROL";

  value: string;
  reason?: string;
  reasonForDisable?: string;
  accountNumber?: string;
  transactionDailyLimit?: string;
  transactionOneTimeLimit?: string;
  serviceName?: string;
  access?: object;
  previousData?: object;
  homeBranch: string;
  reasonForEnable?: string;
  reasonForReject?: string;
  time: Date;
  realm: string;
  businessId: mongoose.Types.ObjectId;
  branchCode?: string;
  user: mongoose.Types.ObjectId;
  createdAt?: Date; // Automatically managed
  updatedAt?: Date; // Automatically managed
}

// Define the Schema
export const ldapActionsSchema = new Schema<ILDAPAction>(
  {
    checkeruser: { type: String },
    makeruser: { type: String },
    reason: { type: String },
    reasonForReject: { type: String },
    reasonForDisable: { type: String },
    reasonForEnable: { type: String },
    homeBranch: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    requestAction: {
      type: String,
      enum: [
        "LINK_ACCOUNT",
        "UNLINK_ACCOUNT",
        "RESET_PIN",
        "ACTIVATE_ACCOUNT",
        "UNLINK_DEVICE",
        "CHANGE_NAME",
        "LINK_ANDOR_ACCOUNT",
        "REJECT_ACCOUNT",
        "DETACH_PHONE_NUMBER",
        "CHANGE_PHONE_NUMBER",
        "ADD_ACCOUNT",
        "ATTACH_PHONE_NUMBER",
        "DISABLE_USER",
        "UPDATE_ONE_LIMIT",
        "UPDATE_LIMIT",
        "ENABLE_USER",
        "CHANGE_EMAIL",
        "ACCESS_CONTROL",
      ],
    },
    branchCode: { type: [String] },
    value: { type: String }, // action details like account number, phone number, etc.
    accountNumber: { type: String },
    transactionDailyLimit: { type: String },
    transactionOneTimeLimit: { type: String },
    serviceName: { type: String },
    access: { type: Object },
    previousData: { type: Object },
    time: { type: Date, default: Date.now },
    businessId: { type: Schema.Types.ObjectId, ref: "Business" },
    realm: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);
ldapActionsSchema.plugin(modules.paginator);

// Create the Model
const ldapActionsModel = mongoose.model<LDAPAction, PaginateModel<LDAPAction>>(
  "LDAPActions",
  ldapActionsSchema
);

// Export the LDAPActions model
export default ldapActionsModel;
