import mongoose, { Document } from "mongoose";

/* ===== Interface ===== */
export interface IAccessList {
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

/* ===== AccessList Schema ===== */
const AccessListSchema = new mongoose.Schema<IAccessList>({
  transfertodashen: Boolean,
  transfertootherbank: Boolean,
  ips: Boolean,
  ipsoutgoing: Boolean,
  ipsincoming: Boolean,
  wallet: Boolean,
  wallettelebirr: Boolean,
  walletmpesa: Boolean,
  topup: Boolean,
  ethiotelecomtopup: Boolean,
  safaricomtopup: Boolean,
  utility: Boolean,
  schoolfeepay: Boolean,
  dstv: Boolean,
  ethiopianairlines: Boolean,
  trafficpayparking: Boolean,
  trafficpaypenalty: Boolean,
  merchantpay: Boolean,
  microfinance: Boolean,
  awach: Boolean,
  sahay: Boolean,
  requestmoney: Boolean,
  chat: Boolean,
  chatsendmoney: Boolean,
  chatrequestmoney: Boolean,
  kazna: Boolean,
  qrpay: Boolean,
  dashenqrpay: Boolean,
  ipsqrpay: Boolean,
  profilebankingsettings: Boolean,
  profileaccountsettings: Boolean,
  addnewaccount: Boolean,
  linkexistingaccount: Boolean,
  ministatement: Boolean,
  miniapps: Boolean,
  transactionslist: Boolean,
  balanceview: Boolean,
  budget: Boolean,
});

/* ===== Main Schema ===== */
const UserAccessSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user: { type: mongoose.Schema.Types.ObjectId },
    accessList: AccessListSchema,
    lastModified: Date,
    batch_tag: String,
  },
  {
    collection: "accesslists",
    versionKey: false,
  }
);

/* ===== Model ===== */
export const AccessListModel = mongoose.model("UserAccess", UserAccessSchema);
