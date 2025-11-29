import mongoose, { Schema } from "mongoose";

export interface ITransactionLimit extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  account_holder_name: string;
  account_number: string;
  phone_number: string;
  service: {
    service_key: string;
    customer_daily_transaction_limit: {
      min: string;
      max: string;
    };
    customer_single_transaction_limit: {
      min: string;
      max: string;
    };
  };
  created_at: Date;
  last_modifed_at: Date;
  batch_tag: string;
}

const TransactionLimitsSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    user: { type: mongoose.Types.ObjectId},

    account_holder_name: { type: String },
    account_number: { type: String },
    phone_number: { type: String },

    service: {
      service_key: { type: String },
      customer_daily_transaction_limit: {
        min: { type: String },
        max: { type: String }
      },
      customer_single_transaction_limit: {
        min: { type: String },
        max: { type: String }
      }
    },

    created_at: { type: Date },
    last_modifed_at: { type: Date },
    batch_tag: { type: String }
  },
  { collection: "transaction_limits", versionKey: false }
);
export const TransactionLimitsModel = mongoose.model<ITransactionLimit>("TransactionLimits", TransactionLimitsSchema);
