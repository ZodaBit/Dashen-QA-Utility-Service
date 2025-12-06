import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  notification_type: string;
  notification_body: string;
  is_public: boolean;
  for: string;
  created_by: string;
  notification_parts: any[] | null;
  seen: boolean;
  enabled: boolean;
  status: string;
  is_deleted: boolean;
  created_at: Date;
  last_modified: Date;
  deleted_at: Date | null;
    batch_tag: string;
}

const NotificationSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    title: { type: String, required: true },
    notification_type: { type: String, required: true },
    notification_body: { type: String, required: true },
    is_public: { type: Boolean, default: false },
    for: { type: String, required: true },
    created_by: { type: String, required: true },

    notification_parts: { type: Array, default: null },

    seen: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    status: { type: String, default: "PENDING" },
    is_deleted: { type: Boolean, default: false },

    created_at: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    batch_tag: { type: String },
  },
  { collection: "notifications", versionKey: false }
);

export const NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema);
