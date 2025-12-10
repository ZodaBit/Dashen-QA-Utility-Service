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

    company_name: { type: String, required: true },
    company_logo: { type: String, required: true },

    account_number: { type: String, required: true },
    account_holder_name: { type: String, required: true },

    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },

    enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },

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
