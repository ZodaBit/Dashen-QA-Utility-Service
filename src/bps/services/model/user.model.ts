import mongoose, { Schema, Document } from "mongoose";

/**
 * User document interface
 */
export interface IUser extends Document {
  userCode: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  email: string;
  userName: string;
  userBio: string;
  realm: string;
  poolSource: string;
  permissionGroup: mongoose.Types.ObjectId[];
  permissions: any[];
  mainAccount: string;
  accountLinked: boolean;
  andOrCustomerNumber: any[];
  accountType: string;
  KYCStatus: string;
  KYCRejectReasonField: any[];
  KYCApproved: boolean;
  brachApproved: boolean;
  isVerified: boolean;
  KYCActionBy: any[];
  BranchActionBy: any[];
  chatGroups: any[];
  loginAttemptCount: number;
  lockedOnAttemptMAX: boolean;
  dateJoined: Date;
  lastModified: Date;
  LDAPStatus: string;
  firstPINSet: boolean;
  loanScore: number;
  deviceStatus: string;
  unlockAccountRequested: boolean;
  enabled: boolean;
  isDeleted: boolean;
  primaryAuthentication: string;
  PINHistory: any[];
  isAccountBlocked: boolean;
  isActivated: boolean;
  cronBlockAction: boolean;
  KYCLevel: string;
  virtualAccount: boolean;
  isUSSDEnabled: boolean;
  lastSIMOwnershipChangeISOTime: Date | null;
  lastSIMReplacementISOTime: Date | null;
  lastSIMStatus: string | null;
  lastSIMStatusChangeISOTime: Date | null;
  branchCode: string;
  createdForUssd: boolean;
  APPInstallationDate: Date;
  APPVersion: string;
  deviceLinkedDate: Date;
  devicePlatform: string;
  deviceUUID: string;
  loginPIN: string;
  passwordChangedAt: Date;
  lastLogin: Date;
  pushToken: string;
  sessionExpiresOn: Date;
  lastLoginAttempt: Date;
  nextLoginAttempt: Date;
  lastDailyReward: Date;
  branchName: string;
  districtCode: string;
  accountBranchType: string;
  customerNumber: string;
  districtName: string;
  initialLinkedDate: Date;
  region: string;
  lastAccountLinked: boolean;
  lastMainAccount: string;
  OPTLastVerifiedAt: Date;
  OTPStatus: string;
  detached: boolean;
  detachedPhoneNumbers: string[];
  isUSSDSubscribed: boolean;
  batch_tag: string;
}

/**
 * User schema
 */
const UserSchema: Schema = new Schema(
  {
    userCode: { type: String, required: true },
    fullName: { type: String },
    phoneNumber: { type: String },
    avatar: { type: String },
    email: { type: String },
    userName: { type: String },
    userBio: { type: String },
    realm: { type: String },
    poolSource: { type: String },

    permissionGroup: [{ type: Schema.Types.ObjectId, ref: "PermissionGroup" }],
    permissions: { type: Array, default: [] },

    mainAccount: { type: String },
    accountLinked: { type: Boolean, default: false },
    andOrCustomerNumber: { type: Array, default: [] },
    accountType: { type: String },

    KYCStatus: { type: String },
    KYCRejectReasonField: { type: Array, default: [] },
    KYCApproved: { type: Boolean, default: false },
    brachApproved: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

    KYCActionBy: { type: Array, default: [] },
    BranchActionBy: { type: Array, default: [] },
    chatGroups: { type: Array, default: [] },

    loginAttemptCount: { type: Number, default: 0 },
    lockedOnAttemptMAX: { type: Boolean, default: false },

    dateJoined: { type: Date },
    lastModified: { type: Date },

    LDAPStatus: { type: String },
    firstPINSet: { type: Boolean, default: false },
    loanScore: { type: Number, default: 0 },

    deviceStatus: { type: String },
    unlockAccountRequested: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    primaryAuthentication: { type: String },
    PINHistory: { type: Array, default: [] },

    isAccountBlocked: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: false },
    cronBlockAction: { type: Boolean, default: false },

    KYCLevel: { type: String },
    virtualAccount: { type: Boolean, default: false },
    isUSSDEnabled: { type: Boolean, default: false },

    lastSIMOwnershipChangeISOTime: { type: Date, default: null },
    lastSIMReplacementISOTime: { type: Date, default: null },
    lastSIMStatus: { type: String, default: null },
    lastSIMStatusChangeISOTime: { type: Date, default: null },

    branchCode: { type: String },
    createdForUssd: { type: Boolean, default: false },

    APPInstallationDate: { type: Date },
    APPVersion: { type: String },

    deviceLinkedDate: { type: Date },
    devicePlatform: { type: String },
    deviceUUID: { type: String },

    loginPIN: { type: String },
    passwordChangedAt: { type: Date },
    lastLogin: { type: Date },

    pushToken: { type: String },
    sessionExpiresOn: { type: Date },

    lastLoginAttempt: { type: Date },
    nextLoginAttempt: { type: Date },
    lastDailyReward: { type: Date },

    branchName: { type: String },
    districtCode: { type: String },
    accountBranchType: { type: String },
    customerNumber: { type: String },
    districtName: { type: String },

    initialLinkedDate: { type: Date },
    region: { type: String },

    lastAccountLinked: { type: Boolean, default: false },
    lastMainAccount: { type: String },

    OPTLastVerifiedAt: { type: Date },
    OTPStatus: { type: String },

    detached: { type: Boolean, default: false },
    detachedPhoneNumbers: { type: [String], default: [] },

    isUSSDSubscribed: { type: Boolean, default: false },
    batch_tag: { type: String },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

/**
 * User model
 */
export const UserModel = mongoose.model<IUser>("User", UserSchema);
