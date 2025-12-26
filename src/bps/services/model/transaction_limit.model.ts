import mongoose, { Schema, Document } from "mongoose";

// Define the shape of the nested limit objects
type ServiceLimits = Record<string, number>; // e.g., "3848": 500000, "transfer_to_dashen": 3000000

export interface ITransactionLimit extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;

  // Main limits
  dailyTransactionLimit: ServiceLimits;
  dailyTransactionLimitView: ServiceLimits; // Seems like a duplicate/view version
  singleTransactionLimit: ServiceLimits;
  minimumAmount: ServiceLimits;

  // Custom overrides (can be empty)
  customDailyTransactionLimit: ServiceLimits;
  customSingleTransactionLimit: ServiceLimits;

  createdAt: Date;
  updatedAt: Date;
}

const TransactionLimitSchema: Schema = new Schema<ITransactionLimit>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
      index: true,
    },

    dailyTransactionLimit: {
      type: Schema.Types.Mixed, // Record<string, number>
      required: true,
      default: {},
    },

    dailyTransactionLimitView: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },

    singleTransactionLimit: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },

    minimumAmount: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },

    customDailyTransactionLimit: {
      type: Schema.Types.Mixed,
      default: {},
    },

    customSingleTransactionLimit: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    collection: "transactionlimits", // adjust if your actual collection name differs
    timestamps: true, // automatically manages createdAt & updatedAt
    versionKey: false, // keeps __v (you had it in JSON), set to false if you want to remove
  }
);

// Optional: Compound index for performance
TransactionLimitSchema.index({ user: 1 });

export const TransactionLimitModel = mongoose.model<ITransactionLimit>(
  "TransactionLimit",
  TransactionLimitSchema
);