import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  _id: mongoose.Types.ObjectId;
  card_name: string;
  sub_cards: string[];
   batch_tag: string;
}

const CardSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    card_name: { type: String },

    sub_cards: { type: [String] },
    batch_tag: { type: String },
  },
  { collection: "portal_cards", versionKey: false }
);

export const PortalCardModel = mongoose.model<ICard>("PortalCard", CardSchema);
