import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type ArchivedUser } from "../config/types/archiveduser";

const Schema = modules.mongoose.Schema;

const ArchivedUserSchema = new Schema<ArchivedUser>(
  {
    userCode: { type: String },
    fullName: { type: String },
    motherName: { type: String },
    nationality: { type: String },

    birthDate: { type: Date },
    phoneNumber: { type: String },
    gender: { type: String },

    martialStatus: { type: String },
    employmentStatus: { type: String },
    occupation: { type: String },
    employersName: { type: String },
    monthlyIncome: { type: String },

    country: { type: String },
    region: { type: String },
    city: { type: String },
    wereda: { type: String },
    subCity: { type: String },
    houseNo: { type: String },
    documentFront: { type: String },
    documentBack: { type: String },
    photo: { type: String },
    signature: { type: String },

    idNumber: { type: String },
    residentialStatus: { type: String },

    avatar: { type: String },
    email: { type: String },
    userName: { type: String },
    userBio: { type: String },

    documentImage: { type: String },
    userImage: { type: String },

    organizationID: { type: String },
    organizationName: { type: String },
    realm: { type: String },
    poolSource: { type: String, enum: ["portal", "app", "agent"] },
    merchantRole: { type: String },
    permissionGroup: [{ type: Schema.Types.ObjectId, ref: "PermissionGroups" }],
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permissions" }],
    isChecker: { type: Boolean },
    isMaker: { type: Boolean },

    mainAccount: { type: String },
    linkedAccounts: [
      {
        accountNumber: { type: String },
        linkedStatus: { type: Boolean },
        linkedDate: { type: Date },
      },
    ],
    accountLinked: { type: Boolean, default: false },
    accountType: { type: String, enum: ["NEW", "LINKED"] },
    accountStatus: { type: String },
    branchCode: { type: String },
    branchName: { type: String },
    districtName: { type: String },
    districtCode: { type: String },

    KYCStatus: { type: String },

    KYCRejectReasonField: { type: Array },
    KYCRejectReason: { type: String },

    KYCApproved: { type: Boolean, default: false }, // branch extra layer ?
    brachApproved: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

    isSelfRegistered: { type: Boolean },
    registeredBy: { type: Object }, // if not self registerd
    KYCActionBy: [{ type: Object }],
    BranchActionBy: [{ type: Object }],

    chatGroups: [{ type: Schema.Types.ObjectId, ref: "Groups" }],
    loginAttemptCount: { type: Number, default: 0 },
    dateJoined: { type: Date },
    lastModified: { type: Date },
    lastLoginAttempt: { type: Date },
    nextLoginAttempt: { type: Date },
    lastOnlineDate: { type: Date },
    lastLogin: { type: Date },

    LDAPStatus: { type: String },

    loginPIN: { type: String },
    firstPINSet: { type: Boolean, default: false },
    deviceUUID: { type: String },
    loanScore: { type: Number, default: 0 },
    deviceStatus: { type: String, enum: ["LINKED", "UNLINKED"] },
    deviceLinkedDate: { type: Date },
    sessionExpiresOn: { type: Date },
    accountAuthorizationCode: { type: String },
    unlockAccountRequested: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    passwordChangedAt: Date,
    OTPStatus: { type: String },
    OTPLastTriedAt: { type: Date },
    OPTLastVerifiedAt: { type: Date },
    OTPVerifyCount: { type: Number },

    PINHistory: [{ type: String }],
    customerNumber: { type: String },
    isAccountBlocked: { type: Boolean, default: false },

    APPInstallationDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

// add mongoose-troop middleware to support pagination
ArchivedUserSchema.plugin(modules.paginator);

ArchivedUserSchema.pre<ArchivedUser>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.dateJoined = now;
  this.lastModified = now;

  next();
});
// Pre-save middleware to update passwordChangedAt field
ArchivedUserSchema.pre<ArchivedUser>("save", function preSaveMiddleware(next) {
  if (!this.isModified("loginPIN") || this.isNew) return next();

  this.passwordChangedAt = modules.moment().toDate();

  next();
});
const archivedUserModel = modules.mongoose.model<
  ArchivedUser,
  PaginateModel<ArchivedUser>
>("ArchivedUser", ArchivedUserSchema);

export default archivedUserModel;
