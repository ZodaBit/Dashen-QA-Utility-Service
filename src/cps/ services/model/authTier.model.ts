import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type AuthTier } from "../config/types/authtier";
import { AuthTierMethod } from "../utils/enums/authTier.enum";

const Schema = modules.mongoose.Schema;

const AuthTierSchema = new Schema<AuthTier>({
  minAmount: { type: Number },
  maxAmount: { type: Number },
  method: { type: String, enum: Object.values(AuthTierMethod) },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

// add mongoose-troop middleware to support pagination
AuthTierSchema.plugin(modules.paginator);

AuthTierSchema.pre<AuthTier>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

const AuthTierModel = modules.mongoose.model<AuthTier, PaginateModel<AuthTier>>(
  "AuthTier",
  AuthTierSchema
);

export default AuthTierModel;