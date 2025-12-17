import mongoose, { Schema, Document } from "mongoose";

// Enums (Updated to reflect potential data in JSON)
type Gender = "MALE" | "FEMALE";
type Realm = "member"; // The JSON only shows "member"
type AccountStatus = "ACTIVE" | "INACTIVE"; // Inferred, JSON uses 'KYCStatus'
type KYCStatus = "PENDING" | "APPROVED" | "REJECTED";
type LDAPStatus = "AUTHORIZED" | "DENIED" | "PENDING" | "INITIATED";
type DeviceStatus = "LINKED" | "UNLINKED"; // Inferred

// Nested interfaces matching the JSON structure
interface Address {
  zone?: string;
  wereda?: string;
  kebele?: string;
  region?: string;
  city?: string;
  sub_city?: string;
  street_name?: string;
  house_number?: string;
}

interface Fayda {
  id_number?: string;
  fayda_access_token?: string;
  employment_status?: string;
  employer_name?: string;
  issued_by?: string;
  monthly_income?: number;
}

// Main User interface (IUserV2)
// Namespaces use camelCase to match the JSON keys precisely
export interface IUser extends Document {
  userCode: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  email: string;
  userName: string;
  userBio?: string;
  realm: Realm;
  poolSource: string;
  permissionGroup: Schema.Types.ObjectId[];
  permissions: any[];
  mainAccount: string;
  linkedAccounts: any[];
  accountLinked: boolean;
  andOrCustomerNumber: any[];
  accountType: string;
  KYCStatus: KYCStatus;
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
  LDAPStatus: LDAPStatus;
  firstPINSet: boolean;
  loanScore: number;
  deviceStatus: DeviceStatus;
  unlockAccountRequested: boolean;
  enabled: boolean;
  isDeleted: boolean;
  primaryAuthentication: string;
  PINHistory: (string | null)[];
  isAccountBlocked: boolean;
  isActivated: boolean;
  cronBlockAction: boolean;
  KYCLevel: number; // Added from original JSON key
  // Potential fields from the first TS interface that weren't in the provided JSON snapshot
  mother_name?: string;
  nationality?: string;
  birth_date?: Date;
  // ... other potential fields
}

// Schema definition (MemberSchemaV2)
const UserSchema: Schema = new Schema(
  {
    userCode: { type: String, required: true, unique: true },
    fullName: { type: String },
    phoneNumber: { type: String, required: true },
    avatar: { type: String },
    email: { type: String },
    userName: { type: String },
    userBio: { type: String },
    realm: { type: String, enum: ["member"], default: "member" },
    poolSource: { type: String },
    permissionGroup: [{ type: Schema.Types.ObjectId, ref: 'PermissionGroup' }], // Assuming a PermissionGroup model reference
    permissions: { type: Schema.Types.Array },
    mainAccount: { type: String },
    linkedAccounts: { type: Schema.Types.Array },
    accountLinked: { type: Boolean, default: false },
    andOrCustomerNumber: { type: Schema.Types.Array },
    accountType: { type: String },
    KYCStatus: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"] },
    KYCRejectReasonField: { type: Schema.Types.Array },
    KYCApproved: { type: Boolean },
    brachApproved: { type: Boolean },
    isVerified: { type: Boolean },
    KYCActionBy: { type: Schema.Types.Array },
    BranchActionBy: { type: Schema.Types.Array },
    chatGroups: { type: Schema.Types.Array },
    loginAttemptCount: { type: Number, default: 0 },
    lockedOnAttemptMAX: { type: Boolean, default: false },
    dateJoined: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    LDAPStatus: { type: String, enum: ["AUTHORIZED", "DENIED", "PENDING", "INITIATED"] },
    firstPINSet: { type: Boolean, default: false },
    loanScore: { type: Number, default: 0 },
    deviceStatus: { type: String, enum: ["LINKED", "UNLINKED"] },
    unlockAccountRequested: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    primaryAuthentication: { type: String },
    PINHistory: { type: [String] },
    isAccountBlocked: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: true },
    cronBlockAction: { type: Boolean, default: false },
    KYCLevel: { type: Number }
  },
  {
    collection: "users",
    versionKey: false,
    strict: false // Strict mode set to false to allow additional fields not explicitly defined
  }
);

// Model
export const UsersModel = mongoose.model<IUser>("User", UserSchema);
