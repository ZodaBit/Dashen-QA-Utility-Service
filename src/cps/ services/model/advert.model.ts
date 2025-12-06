import mongoose, { Schema, Document } from "mongoose";

export interface IAdvert extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  banner_image: string;
  advert_for: string;
  advert_date: {
    started_at: Date;
    expired_at: Date;
  };
  enabled: boolean;
  is_deleted: boolean;
  deleted_at: Date | null;
  created_at: Date;
  last_updated_at: Date;
   batch_tag: string;
}

const AdvertSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    title: { type: String, required: true },
    description: { type: String, required: true },
    banner_image: { type: String, required: true },
    advert_for: { type: String, required: true },

    advert_date: {
      started_at: { type: Date, required: true },
      expired_at: { type: Date, required: true },
    },

    enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },

    created_at: { type: Date, default: Date.now },
    last_updated_at: { type: Date, default: Date.now },
    batch_tag: { type: String },
  },
  { collection: "adverts", versionKey: false }
);

export const AdvertModel = mongoose.model<IAdvert>("Advert", AdvertSchema);
