import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import userModel from "./user.model";
import { Business } from "../config/types/business";

const Schema = modules.mongoose.Schema;

const businessSchema = new Schema<Business>({
  TILLNumber: { type: String, unique: true },
  businessName: { type: String },
  accountNumber: { type: String },
  accountHolderName: { type: String },
  phoneNumber: { type: String },
  branchCode: { type: String },
  linkedBranch: { type: String },
  checkeruser: { type: String },
  makeruser: { type: String },
  branchName: { type: String },
  districtCode: { type: String },
  linkedDistrict: { type: String },
  subCity: { type: String },
  districtName: { type: String },
  adminID: { type: Schema.Types.ObjectId, ref: userModel.modelName },
  email: { type: String },
  portalAddress: { type: String },
  streetName: { type: String },

  totalCollectedAmount: { type: Number, default: 0 },
  totalPulledAmount: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  licenseNumber: { type: String },
  TIN: { type: String },
  webAddress: { type: String },
  commercialRegistration: { type: String },
  dateOfEstablishment: { type: String },
  KYCStatus: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  businessLogo: { type: String },
  region: { type: String },
  city: { type: String },
  LDAPStatus: {
    type: String,
    enum: ["AUTHORIZED", "DENIED", "PENDING"],
    default: "PENDING",
  },
  LdapRejectedFields: [String],
  countryISO2: { type: String, default: "ET" },
  currency: { type: String, default: "230" }, //from body code
  IPSEnabled: { type: Boolean, default: true }, //from body update
  MCC: { type: String }, //from body not always but first
  formatIndictor: { type: String, default: "01" },
  CRC: { type: String }, //algorthim from my side
  GUID: { type: String },
  zone: { type: String, default: "00" },
  woreda: { type: String },
  kebele: { type: String },
  houseNumber: { type: String },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

businessSchema.plugin(modules.paginator);

businessSchema.pre<Business>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;

  next();
});

businessSchema.index(
  {
    TILLNumber: 1,
    createdAt: 1,
    phoneNumber: 1,
    accountNumber: 1,
    accountHolderName: 1,
    enabled: 1,
    city: 1,
  },
  { unique: true, sparse: true }
);

const businessModel = modules.mongoose.model<Business, PaginateModel<Business>>(
  "Business",
  businessSchema
);

export default businessModel;
