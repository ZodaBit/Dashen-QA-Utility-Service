import mongoose, { Schema, Document } from "mongoose";

export interface IDonationCompany extends Document {
  _id: mongoose.Types.ObjectId;
  company_name: string;
  company_logo: string;
  account_number: string;
  account_holder_name: string;
  address: string;
  phone_number: string;
  email: string;
  enabled: boolean;
  is_deleted: boolean;
  created_at: Date;
  last_modified_at: Date;
  batch_tag: string;
}

const DonationCompanySchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    company_name: { type: String },
    company_logo: { type: String },

    account_number: { type: String },
    account_holder_name: { type: String },

    address: { type: String },
    phone_number: { type: String },
    email: { type: String },

    enabled: { type: Boolean },
    is_deleted: { type: Boolean },

    created_at: { type: Date, default: Date.now },
    last_modified_at: { type: Date, default: Date.now },
    batch_tag: { type: String },
  },
  { collection: "donation_companies", versionKey: false }
);

export const DonationCompanyModel = mongoose.model<IDonationCompany>(
  "DonationCompany",
  DonationCompanySchema
);
