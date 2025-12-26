import { object } from "joi";
import { CPSAction } from "../config/types/cpsAction";
import modules from "./imports/index";
import mongoose from "mongoose";
import { type PaginateModel } from "mongoose";
import { CPSRequestAction } from "../utils/enums/cpsAction.enum";

const Schema = mongoose.Schema;

const cpsActionsSchema = new Schema<CPSAction>(
  {
    actionCode: { type: String },
    checkerUser: {
      userCode: { type: String },
      fullName: { type: String },
      phoneNumber: { type: String },
    },
    makerUser: {
      userCode: { type: String },
      fullName: { type: String },
      phoneNumber: { type: String },
    },
    rejectedReason: { type: String },
    department: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    requestAction: {
      type: String,
      enum: Object.values(CPSRequestAction),
    },
    actionType: { type: String, enum: ["UPDATE", "DELETE", "CREATE"] },
    actionData: { type: Object },
    previousData: { type: Object },
    responseData: { type: Object },
    makerActionTime: { type: Date },
    checkerActionTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

// 🔍 Indexes for performance
cpsActionsSchema.index({ "makerUser.userCode": 1 });
cpsActionsSchema.index({ "checkerUser.userCode": 1 });
cpsActionsSchema.index({ requestAction: 1 });
cpsActionsSchema.index({ actionType: 1 });
cpsActionsSchema.index({ status: 1 });
cpsActionsSchema.index({ makerActionTime: -1 }); // for sorting
cpsActionsSchema.index({ createdAt: 1 });
cpsActionsSchema.index({ makerActionTime: -1 });
// Pagination plugin
cpsActionsSchema.plugin(modules.paginator);

// Model
const cpsActionsModel = mongoose.model<CPSAction, PaginateModel<CPSAction>>(
  "CPSActions",
  cpsActionsSchema
);

export default cpsActionsModel;
