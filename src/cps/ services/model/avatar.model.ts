import mongoose, { Schema, Document } from "mongoose";

export interface IAvatar extends Document {
  _id: mongoose.Types.ObjectId;
  avatar: string;
  label: string;
  enable: boolean;
  is_deleted: boolean;
  created_at: Date;
  last_modified_at: Date;
  deleted_at: Date | null;
   batch_tag: string;
}

const AvatarSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    avatar: { type: String },
    label: { type: String },

    enable: { type: Boolean },
    is_deleted: { type: Boolean },

    created_at: { type: Date },
    last_modified_at: { type: Date },
    deleted_at: { type: Date, default: null },
    batch_tag: { type: String },
  },
  { collection: "avatars", versionKey: false }
);

export const AvatarModel = mongoose.model<IAvatar>("Avatar", AvatarSchema);
