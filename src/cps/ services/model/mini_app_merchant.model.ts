import mongoose, { Schema, Document } from "mongoose";

export interface IMerchant extends Document {
  _id: mongoose.Types.ObjectId;
  merchant_code: string;
  merchant_name: string;
  merchant_type: string;

  kyc: {
    status: string;
    representative: {
      name: string;
      email: string;
      phone: string;
    };
  };

  bank_account_number: string;
  branches: any[] | null;

  email: string;
  phone_number: string;

  enabled: boolean;
  is_deleted: boolean;

  created_at: Date;
  last_updated_at: Date;
  deleted_at: Date | null;
   batch_tag: string;
}

const MerchantSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    merchant_code: { type: String, required: true },
    merchant_name: { type: String, required: true },
    merchant_type: { type: String, required: true },

    kyc: {
      status: { type: String, required: true },
      representative: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
      },
    },

    bank_account_number: { type: String, required: true },
    branches: { type: Array, default: null },

    email: { type: String, required: true },
    phone_number: { type: String, required: true },

    enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },

    created_at: { type: Date, default: Date.now },
    last_updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    batch_tag: { type: String },
  },
  { collection: "mini_app_merchant", versionKey: false }
);

export const MiniAppMerchantModel = mongoose.model<IMerchant>(
  "Merchant",
  MerchantSchema
);
