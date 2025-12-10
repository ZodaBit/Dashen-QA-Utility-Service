import mongoose, { Schema, Document } from "mongoose";

export interface IMiniCategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  icon: string;
  is_deleted: boolean;
  is_enabled: boolean;
  updated_at: Date;
  created_at: Date;
   batch_tag: string;
}

const CategorySchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    name: { type: String, required: true },
    icon: { type: String, required: true },

    is_deleted: { type: Boolean, default: false },
    is_enabled: { type: Boolean, default: true },

    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    batch_tag: { type: String },
  },
  { collection: "mini_app_categories", versionKey: false }
);

export const MiniAppCategoryModel = mongoose.model<IMiniCategory>(
  "MiniAppCategory",
  CategorySchema
);
