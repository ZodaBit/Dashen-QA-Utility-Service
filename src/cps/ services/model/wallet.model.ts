import { Wallet } from "../config/types/wallet";
import mongoose, {type PaginateModel} from "mongoose";
import modules from "./imports/index";

const Schema = modules.mongoose.Schema;

const WalletSchema = new Schema(
  {
    walletName: { type: String },
    walletCode: { type: String },
    avatar: { type: String },
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

WalletSchema.plugin(modules.paginator);

const WalletModel = mongoose.model<Wallet, PaginateModel<Wallet>>("Wallet", WalletSchema);

export default WalletModel;
