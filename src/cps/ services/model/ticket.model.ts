import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type Ticket } from "../config/types/ticket";

const Schema = modules.mongoose.Schema;

const TicketSchema = new Schema<Ticket>({
  orderID: { type: String, index: true },
  ticketCode: { type: String },
  ticketNumber: { type: String },
  ticketQRString: { type: String, index: true },
  ticketPrice: { type: Number },
  ticketCategory: { type: String },
  ticketStatus: {
    type: String,
    enum: ["booked", "expired", "paid", "redeemed"],
  },
  redeemDate: { type: Date },
  redeemedBy: {
    attendantID: { type: Schema.Types.ObjectId, ref: "User" },
    attendantName: { type: String },
    attendantCode: { type: String },
    attendantPhone: { type: String },
  },
  memberID: { type: Schema.Types.ObjectId, ref: "User" },
  memberName: { type: String },
  memberCode: { type: String },
  memberAccount: { type: String },
  memberPhone: { type: String },
  memberEmail: { type: String },
  totalPrice: { type: Number },
  numberOfTickets: { type: Number },
  ticketNumbers: [{ type: String }],
  merchantID: { type: Schema.Types.ObjectId, ref: "MiniAppMerchant" },
  merchantName: { type: String },
  merchantPhone: { type: String },
  merchantAccount: { type: String },
  eventID: { type: Schema.Types.ObjectId, ref: "Event" },
  eventName: { type: String },
  eventCode: { type: String },
  eventVenue: { type: String },
  eventCity: { type: String },
  eventDate: { type: Date },
  FTNumber: { type: String },
  transactionID: { type: String },
  paidAmount: { type: Number },
  paidDate: { type: Date },
  paymentMethod: { type: String },
  cashierID: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date },
  lastModified: { type: Date },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  guestInfos: [{ type: Schema.Types.ObjectId, ref: "GuestInfo" }],
});

TicketSchema.index(
  { isDeleted: 1, eventCode: 1, ticketNumber: 1 },
  { name: "idx_isDeleted_eventCode_ticketNumber" },
);

TicketSchema.plugin(modules.paginator);

TicketSchema.pre<Ticket>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

const ticketModel = modules.mongoose.model<Ticket, PaginateModel<Ticket>>(
  "Ticket",
  TicketSchema,
);

export default ticketModel;