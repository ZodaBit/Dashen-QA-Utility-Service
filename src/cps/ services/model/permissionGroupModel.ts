/**
 * PermissionGroup Model Definition.
 */
import { type PaginateModel } from "mongoose";
import modelImports from "./imports";
import { PermissionGroup } from "../config/types/permissionGroup";


const { moment, mongoose, paginator } = modelImports;

const PermissionGroupSchema = new mongoose.Schema<PermissionGroup>({
  groupName: { type: String, required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  permissionCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "permissionCategory" },
  ],
  realm: {
    type: String,
    enum: [
      "elst",
      "merchant",
      "order-manager",
      "member",
      "driver",
      "miniapp-merchant",
      "bank",
    ],
  },
  role: { type: String, enum: ["MAKER", "CHECKER"] },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

// add mongoose-troop middleware to support pagination
PermissionGroupSchema.plugin(paginator);

PermissionGroupSchema.pre<PermissionGroup>(
  "save",
  function preSaveMiddleware(next) {
    const now = moment().toDate();

    this.createdAt = now;
    this.lastModified = now;

    next();
  }
);

const PermissionGroupModel = mongoose.model<
  PermissionGroup,
  PaginateModel<PermissionGroup>
>("PermissionGroup", PermissionGroupSchema);

export default PermissionGroupModel;
