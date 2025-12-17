import mongoose, { Schema, Document } from "mongoose";

export interface IAccessListEntry {
  transfertodashen: boolean;
  transfertootherbank: boolean;
  ips: boolean;
  ipsoutgoing: boolean;
  ipsincoming: boolean;
  wallet: boolean;
  wallettelebirr: boolean;
  walletmpesa: boolean;
  topup: boolean;
  ethiotelecomtopup: boolean;
  safaricomtopup: boolean;
  utility: boolean;
  schoolfeepay: boolean;
  dstv: boolean;
  ethiopianairlines: boolean;
  trafficpayparking: boolean;
  trafficpaypenalty: boolean;
  merchantpay: boolean;
  microfinance: boolean;
  awach: boolean;
  sahay: boolean;
  requestmoney: boolean;
  chat: boolean;
  chatsendmoney: boolean;
  chatrequestmoney: boolean;
  kazna: boolean;
  qrpay: boolean;
  dashenqrpay: boolean;
  ipsqrpay: boolean;
  profilebankingsettings: boolean;
  profileaccountsettings: boolean;
  addnewaccount: boolean;
  linkexistingaccount: boolean;
  ministatement: boolean;
  miniapps: boolean;
  transactionslist: boolean;
  balanceview: boolean;
  budget: boolean;
}

export interface IUserAccess extends Document {
  user: mongoose.Types.ObjectId;
  accessList: IAccessListEntry;
  lastModified: Date;
}

const AccessListEntrySchema: Schema = new Schema({
  transfertodashen: { type: Boolean, default: false },
  transfertootherbank: { type: Boolean, default: false },
  ips: { type: Boolean, default: false },
  ipsoutgoing: { type: Boolean, default: false },
  ipsincoming: { type: Boolean, default: false },
  wallet: { type: Boolean, default: false },
  wallettelebirr: { type: Boolean, default: false },
  walletmpesa: { type: Boolean, default: false },
  topup: { type: Boolean, default: false },
  ethiotelecomtopup: { type: Boolean, default: false },
  safaricomtopup: { type: Boolean, default: false },
  utility: { type: Boolean, default: false },
  schoolfeepay: { type: Boolean, default: false },
  dstv: { type: Boolean, default: false },
  ethiopianairlines: { type: Boolean, default: false },
  trafficpayparking: { type: Boolean, default: false },
  trafficpaypenalty: { type: Boolean, default: false },
  merchantpay: { type: Boolean, default: false },
  microfinance: { type: Boolean, default: false },
  awach: { type: Boolean, default: false },
  sahay: { type: Boolean, default: false },
  requestmoney: { type: Boolean, default: false },
  chat: { type: Boolean, default: false },
  chatsendmoney: { type: Boolean, default: false },
  chatrequestmoney: { type: Boolean, default: false },
  kazna: { type: Boolean, default: false },
  qrpay: { type: Boolean, default: false },
  dashenqrpay: { type: Boolean, default: false },
  ipsqrpay: { type: Boolean, default: false },
  profilebankingsettings: { type: Boolean, default: false },
  profileaccountsettings: { type: Boolean, default: false },
  addnewaccount: { type: Boolean, default: false },
  linkexistingaccount: { type: Boolean, default: false },
  ministatement: { type: Boolean, default: false },
  miniapps: { type: Boolean, default: false },
  transactionslist: { type: Boolean, default: false },
  balanceview: { type: Boolean, default: false },
  budget: { type: Boolean, default: false },
});

const UserAccessSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accessList: { type: AccessListEntrySchema, required: true },
    lastModified: { type: Date, default: Date.now },
  },
  { collection: "accesslists", versionKey: false }
);

export const AccessListModel = mongoose.model<IUserAccess>(
  "UserAccess",
  UserAccessSchema
);