import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type User } from "../config/types/user";

const Schema = modules.mongoose.Schema;

const UserSchema = new Schema<User>({
  userCode: { type: String, index: true },
  fullName: { type: String },
  motherName: { type: String },
  nationality: { type: String },

  role: { type: String, enum: ["MAKER", "CHECKER"] },
  department: { type: String },

  birthDate: { type: Date },
  phoneNumber: { type: String },
  gender: { type: String, enum: ["male", "female"] },
  accountBranchType: { type: String, enum: ["CB", "IFB"] },

  martialStatus: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
  },
  employmentStatus: {
    type: String,
    enum: [
      "full-time",
      "part-time",
      "self-employed",
      "unemployed",
      "student",
      "retired",
      "freelance",
      "intern",
      "contract",
      "other",
    ],
  },
  occupation: { type: String },
  employersName: { type: String },
  annualIncome: { type: String },

  country: { type: String },
  region: { type: String },
  city: { type: String },
  subCity: { type: String },
  zone: { type: String },
  kebele: { type: String },
  woreda: { type: String },
  houseNumber: { type: String },
  portalAddress: { type: String },
  streetName: { type: String },

  avatar: { type: String },
  email: { type: String },
  userName: { type: String },
  userBio: { type: String },

  documentImage: { type: String },
  userImage: { type: String },

  organizationID: { type: Schema.Types.ObjectId, ref: "Business" },
  organizationName: { type: String },
  realm: { type: String },
  poolSource: { type: String, enum: ["portal", "app", "agent"] },
  permissionGroup: [{ type: Schema.Types.ObjectId, ref: "PermissionGroups" }],
  permissionCategory: [
    { type: Schema.Types.ObjectId, ref: "permissionCategory" },
  ],
  permissions: {
    included: [{ type: Schema.Types.ObjectId, ref: "Permissions" }],
    excluded: [{ type: Schema.Types.ObjectId, ref: "Permissions" }],
  },
  isChecker: { type: Boolean },
  isMaker: { type: Boolean },

  mainAccount: { type: String },
  lastMainAccount: { type: String },

  andOrCustomerNumber: [{ type: String }],
  accountLinked: { type: Boolean, default: false },
  lastAccountLinked: { type: Boolean },

  KYCLevel: { type: String },

  verifiedStatus: {
    type: String,
    enum: [
      "registered",
      "cleared",
      "failed",
      "approved",
      "pending",
      "verified",
    ],
  },
  KYCApproved: { type: Boolean, default: false }, // branch extra layer ?
  brachApproved: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isAccountBlocked: { type: Boolean, default: false },
  merchantRole: { type: String, enum: ["owner", "agent"] },

  branchCode: { type: String },
  branchName: { type: String },
  districtName: { type: String },
  districtCode: { type: String },

  isSelfRegistered: { type: Boolean },
  registerdBy: { type: Object }, // if not self registerd
  KYCActionBy: [{ type: Object }],
  BranchActionBy: [{ type: Object }],
  blockedOnCPS: { type: Boolean, default: false },
  isUSSDEnabled: { type: Boolean, default: false },

  chatGroups: [{ type: Schema.Types.ObjectId, ref: "Groups" }],
  loginAttemptCount: { type: Number, default: 0 },
  dateJoined: { type: Date },
  KYCStatus: {
    type: String,
    enum: ["APPROVED", "TEMPORARY_REJECT", "PERMANENT_REJECT"],
  },
  riskLevel: { type: String, enum: ["low", "medium", "high"] },
  lastEnabled: { type: Date },
  lastDisabled: { type: Date },
  lastModified: { type: Date },
  lastLoginAttempt: { type: Date },
  lastOnlineDate: { type: Date },
  lastLogin: { type: Date },
  status: { type: String, enum: ["VERIFIED", "DENIED", "PENDING"] },
  accountType: { type: String, enum: ["NEW", "LINKED"] },
  loginPIN: { type: String },
  deviceUUID: { type: String },
  deviceStatus: { type: String, enum: ["LINKED", "UNLINKED"] },
  sessionExpiresOn: { type: Date },
  accountAuthorizationCode: { type: String },
  unlockAccountRequested: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  passwordChangedAt: Date,
  OTPStatus: { type: String, enum: ["verified", "denied"] },
  OTPLastTriedAt: { type: Date },
  OPTLastVerifiedAt: { type: Date },
  OTPVerifyCount: { type: Number },
  primaryAuthentication: {
    type: String,
    enum: ["phoneNumber", "email", "emailAndPhone"],
    default: "phoneNumber",
  },
  dailyTransactionLimit: { type: Object },
  singleTransactionLimit: { type: Object },
  dailyTransactionLimitView: { type: Object },
  customSingleTransacttionLimit: { type: Object },
  customDailyTransactionLimit: { type: Object },
  accessList: { type: Object },
  customerNumber: { type: String },
  PINHistory: [{ type: String }],
});

// add mongoose-troop middleware to support pagination
UserSchema.plugin(modules.paginator);

UserSchema.pre<User>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.dateJoined = now;
  this.lastModified = now;

  next();
});
// Pre-save middleware to update passwordChangedAt field
UserSchema.pre<User>("save", function preSaveMiddleware(next) {
  if (!this.isModified("loginPIN") || this.isNew) return next();

  this.passwordChangedAt = modules.moment().toDate();

  next();
});

// index
UserSchema.index({
  realm: 1,
  KYCLevel: 1,
  isDeleted: 1,
  phoneNumber: 1,
  branchCode: 1,
  dateJoined: 1,
});

const userModel = modules.mongoose.model<User, PaginateModel<User>>(
  "User",
  UserSchema
);

// Expose the User Model
export default userModel;
