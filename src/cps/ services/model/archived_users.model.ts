import mongoose, { Schema, Document } from "mongoose";

// Enums
type MemberType = "CB" | "IFB";
type Gender = "MALE" | "FEMALE";
type Realm =
  | "ELST"
  | "BANK"
  | "DISTRICT"
  | "BRANCH"
  | "MERCHANT"
  | "COMPANY"
  | "MEMBER";
type AccountStatus = "ACTIVE" | "INACTIVE";
type KYCStatus = "PENDING" | "APPROVED" | "REJECTED";
type BPSStatus = "AUTHORIZED" | "DENIED" | "PENDING" | "INITIATED";

// Nested interfaces
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

interface KYC {
  kyc_reject_reason_field?: Record<string, any>;
  kyc_status?: KYCStatus;
  kyc_reject_reason?: string;
  kyc_approved?: boolean;
  kyc_activity_by?: Record<string, any>;
}

interface LoginPIN {
  pin?: string;
  pin_history?: [string, string, string, string];
  last_pin_created_at?: Date;
}

// Main User interface
export interface IArchivedUser extends Document {
  id?: string;
  user_code?: string;
  full_name?: string;
  mother_name?: string;
  nationality?: string;
  birth_date?: Date;
  branch_name?: string;
  district_name?: string;
  branch_code?: string;
  district_code?: string;
  residential_status?: string;
  issued_date?: Date;
  phone_number?: string;
  gender?: Gender;
  profile_theme_type?: string;
  fayda?: Fayda;
  address?: Address;
  document_front?: string;
  document_back?: string;
  photo?: string;
  signature?: string;
  avatar?: string;
  email?: string;
  username?: string;
  push_token?: string;
  realm?: Realm;
  is_account_blocked?: boolean;
  main_account?: string;
  last_main_account?: string;
  account_linked?: boolean;
  last_account_linked?: boolean;
  member_type?: MemberType;
  account_status?: AccountStatus;
  kyc?: KYC;
  kyc_level?: number;
  branch_approved?: boolean;
  is_verified?: boolean;
  is_self_register?: boolean;
  blocked_on?: string;
  is_blocked?: boolean;
  login_attempt_count?: number;
  next_login_attempt?: Date;
  last_login_attempt?: Date;
  last_online_date?: Date;
  last_login?: Date;
  is_activated?: boolean;
  bps_status?: BPSStatus;
  bps_rejection_reason?: string;
  bps_rejection_field?: string[];
  login_pin?: LoginPIN;
  device_uuid?: string;
  app_version?: string;
  platform?: string;
  application_installation_date?: Date;
  customer_number?: string;
  initial_linked_date?: Date;
  account_type?: string;
  loan_score?: number;
  device_status?: string;
  enabled?: boolean;
  first_pin_set?: boolean;
  pin_changed_at?: Date;
  otp_verify_count?: number;
  initiali_linked_at?: Date;
  created_at?: Date;
  last_modified_at?: Date;
  is_deleted?: boolean;
}

// Schema definition
const ArchivedUserSchema: Schema = new Schema(
  {
    id: { type: String },
    user_code: { type: String },
    full_name: { type: String },
    mother_name: { type: String },
    nationality: { type: String },
    birth_date: { type: Date },
    branch_name: { type: String },
    district_name: { type: String },
    branch_code: { type: String },
    district_code: { type: String },
    residential_status: { type: String },
    issued_date: { type: Date },
    phone_number: { type: String },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    profile_theme_type: { type: String },
    fayda: {
      fayda_id: { type: String },
      fayda_access_token: { type: String },
      employment_status: { type: String },
      employer_name: { type: String },
      issued_by: { type: String },
      monthly_income: { type: Number },
    },
    address: {
      zone: { type: String },
      wereda: { type: String },
      kebele: { type: String },
      region: { type: String },
      city: { type: String },
      sub_city: { type: String },
      street_name: { type: String },
      house_number: { type: String },
    },
    document_front: { type: String },
    document_back: { type: String },
    photo: { type: String },
    signature: { type: String },
    avatar: { type: String },
    email: { type: String },
    username: { type: String },
    push_token: { type: String },
    realm: { type: String, enum: ["ELST", "BANK", "DISTRICT", "BRANCH", "MERCHANT", "COMPANY", "MEMBER"] },
    is_account_blocked: { type: Boolean },
    main_account: { type: String },
    last_main_account: { type: String },
    account_linked: { type: Boolean },
    last_account_linked: { type: Boolean },
    member_type: { type: String, enum: ["CB", "IFB"] },
    account_status: { type: String, enum: ["ACTIVE", "INACTIVE"] },
    kyc: {
      kyc_reject_reason_field: { type: Schema.Types.Mixed },
      kyc_status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"] },
      kyc_reject_reason: { type: String },
      kyc_approved: { type: Boolean },
      kyc_activity_by: { type: Schema.Types.Mixed },
    },
    kyc_level: { type: Number },
    branch_approved: { type: Boolean },
    is_verified: { type: Boolean },
    is_self_register: { type: Boolean },
    blocked_on: { type: String },
    is_blocked: { type: Boolean },
    login_attempt_count: { type: Number },
    next_login_attempt: { type: Date },
    last_login_attempt: { type: Date },
    last_online_date: { type: Date },
    last_login: { type: Date },
    is_activated: { type: Boolean },
    bps_status: { type: String, enum: ["AUTHORIZED", "DENIED", "PENDING", "INITIATED"] },
    bps_rejection_reason: { type: String },
    bps_rejection_field: { type: [String] },
    login_pin: {
      pin: { type: String },
      pin_history: { type: [String] }, // length 4 not enforced by mongoose
      last_pin_created_at: { type: Date },
    },
    device_uuid: { type: String },
    app_version: { type: String },
    platform: { type: String },
    application_installation_date: { type: Date },
    customer_number: { type: String },
    initial_linked_date: { type: Date },
    account_type: { type: String },
    loan_score: { type: Number },
    device_status: { type: String },
    enabled: { type: Boolean },
    first_pin_set: { type: Boolean },
    pin_changed_at: { type: Date },
    otp_verify_count: { type: Number },
    initiali_linked_at: { type: Date },
    created_at: { type: Date },
    last_modified_at: { type: Date },
    is_deleted: { type: Boolean },
     batch_tag:  {type:String},
  },
  { collection: "archived_users", versionKey: false }
);
// Model
export const ArchivedUserModel = mongoose.model<IArchivedUser>("ArchivedUser", ArchivedUserSchema);
