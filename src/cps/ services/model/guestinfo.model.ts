import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type Ticket } from "../config/types/ticket";
import { type GuestInfo } from "../config/types/guestinfo";
import ticketModel from "./ticket.model";

const Schema = modules.mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const guestInfoSchema = new Schema<GuestInfo>({
  ticket: { type: ObjectId, ref: "Ticket", required: true, index: true },
  guestName: { type: String },
  guestPhone: { type: String },
  guestEmail: { type: String },
  pickupLocation: { type: String },
  guestGender: { type: String },
  ageGroup: { type: String },
  tshirtSize: { type: String },
  ticketNumber: { type: String },
  ticketIndex: { type: Number },
  ticketPrice: { type: Number },
  ticketCategory: { type: String },
  ticketType: { type: String },
  ticketQRString: { type: String },
  ticketStatus: {
    type: String,
    enum: ["booked", "expired", "paid", "redeemed"],
  },
  redeemDate: { type: Date },
  redeemedBy: {
    attendantID: { type: ObjectId, ref: "User" },
    attendantName: { type: String },
    attendantCode: { type: String },
    attendantPhone: { type: String },
  },
});

guestInfoSchema.plugin(modules.paginator);

guestInfoSchema.pre<Ticket>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

guestInfoSchema.post("save", async function (doc) {
  await ticketModel.findByIdAndUpdate(doc.ticket, {
    $addToSet: { guestInfos: doc._id },
  });
});

const guestInfoModel = modules.mongoose.model<
  GuestInfo,
  PaginateModel<GuestInfo>
>("GuestInfo", guestInfoSchema);

export default guestInfoModel;