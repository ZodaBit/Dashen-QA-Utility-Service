import mongoose, { Schema, Document } from "mongoose";

export interface IDonationCategory extends Document {
  _id: mongoose.Types.ObjectId;
  category_name: string;
  donation_icon: string;
  enabled: boolean;
  is_deleted: boolean;
  created_at: Date;
  last_modified_at: Date;
  batch_tag: string;
}

const DonationCategorySchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    category_name: { type: String, required: true },
    donation_icon: { type: String, required: true },

    enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },

    created_at: { type: Date, default: Date.now },
    last_modified_at: { type: Date, default: Date.now },
    batch_tag: { type: String },
  },
  { collection: "donation_categories", versionKey: false }
);

export const DonationCategoryModel = mongoose.model<IDonationCategory>(
  "DonationCategory",
  DonationCategorySchema
);
