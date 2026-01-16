import mongoose, { Schema, Document } from "mongoose";

/**
 * Linked Account interface
 */
export interface ILinkedAccount extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  accountNumber: string;
  linkedStatus: boolean;
  accountHolderName: string;
  linkedDate: Date;
  accountType: string;
  AccountBranchCode: string;
  ussdLinkedStatus: boolean;
  linkedBranch: string;
  linkerMaker: string;
  linkerChecker: string;
  lastLinkedStatus: boolean;
  unlinkerChecker: string;
  unlinkerMaker: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Linked Account schema
 */
const LinkedAccountSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    accountNumber: { type: String, required: true },
    linkedStatus: { type: Boolean, default: false },
    accountHolderName: { type: String },

    linkedDate: { type: Date },

    accountType: { type: String },
    AccountBranchCode: { type: String },

    ussdLinkedStatus: { type: Boolean, default: false },
    linkedBranch: { type: String },

    linkerMaker: { type: String },
    linkerChecker: { type: String },

    lastLinkedStatus: { type: Boolean, default: false },

    unlinkerChecker: { type: String },
    unlinkerMaker: { type: String },
  },
  {
    collection: "linkedaccounts",
    timestamps: true, // maps createdAt & updatedAt
    versionKey: false,
  }
);

/**
 * Linked Account model
 */
export const LinkedAccountModel = mongoose.model<ILinkedAccount>(
  "LinkedAccount",
  LinkedAccountSchema
);
