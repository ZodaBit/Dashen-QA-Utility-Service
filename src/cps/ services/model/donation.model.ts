import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  _id: mongoose.Types.ObjectId;
  donation_code: string;
  company_id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  title: string;
  is_featured: boolean;
  target: number;
  current_amount: number;
  donation_description: string;

  donation_images: {
    id: string;
    photo_url: string;
    created_at: Date;
  }[];

  cover_image: string;
  start_date: Date;
  end_date: Date;

  enabled: boolean;
  is_deleted: boolean;
  created_at: Date;
  last_modified_at: Date;
  batch_tag: string;
}

const DonationSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    donation_code: { type: String, required: true },

    company_id: { type: mongoose.Types.ObjectId, required: true },
    category_id: { type: mongoose.Types.ObjectId, required: true },

    title: { type: String, required: true },
    is_featured: { type: Boolean, default: false },

    target: { type: Number, required: true },
    current_amount: { type: Number, default: 0 },

    donation_description: { type: String, required: true },

    donation_images: [
      {
        id: { type: String, required: true },
        photo_url: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
      }
    ],

    cover_image: { type: String, required: true },

    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },

    enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },

    created_at: { type: Date, default: Date.now },
    last_modified_at: { type: Date, default: Date.now },
    batch_tag: { type: String },
  },
  { collection: "donations", versionKey: false }
);

export const DonationModel = mongoose.model<IDonation>(
  "Donation",
  DonationSchema
);
