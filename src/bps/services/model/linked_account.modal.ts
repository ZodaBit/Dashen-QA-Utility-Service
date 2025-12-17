import mongoose, { Schema, Document } from "mongoose";

export interface ILinkedAccount extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // was user_id
  accountNumber: string;
  accountHolderName: string;
  AccountBranchCode: string; // branch code
  linkedStatus: boolean;
  ussdLinkedStatus: boolean;
  linkedDate: Date;
  accountType: string;
  isAccountActive: boolean;
  linkedBranch: string;
  makerAndChecker: {
    Linkers: {
      maker: string;
      checker: string;
    };
  };
  batch_tag: string;
}

const LinkedAccountSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    user: { type: mongoose.Types.ObjectId, required: true },
    accountNumber: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    AccountBranchCode: { type: String },
    linkedStatus: { type: Boolean, default: false },
    ussdLinkedStatus: { type: Boolean, default: false },
    linkedDate: { type: Date },
    accountType: { type: String },
    isAccountActive: { type: Boolean, default: true },
    linkedBranch: { type: String },
    makerAndChecker: {
      Linkers: {
        maker: { type: String },
        checker: { type: String },
      },
    },
    batch_tag: { type: String },
  },
  { collection: "LinkedAccounts", versionKey: false }
);

export const LinkedAccountModel = mongoose.model<ILinkedAccount>(
  "LinkedAccount",
  LinkedAccountSchema
);
