import modules from "./imports/index.js";
import { Document } from "mongoose";

interface Advert extends Document {
  title?: string;
  description?: string;
  bannerImage?: string;
  createdBy?: any;
  startDate?: Date;
  for?: "IFB" | "CB" | "ALL";
  endDate?: Date;
  enabled?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  lastModified?: Date;
}

const Schema = modules.mongoose.Schema;

const AdvertSchema = new Schema<Advert>({
  title: { type: String },
  description: { type: String },
  bannerImage: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date },
  for: { type: String, enum: ["IFB", "CB", "ALL"] },
  endDate: { type: Date },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

// add mongoose-troop middleware to support pagination
AdvertSchema.plugin(modules.paginator);

/**
 * Pre save middleware.
 *
 * Sets the date_created and last_modified attributes prior to save
 */

AdvertSchema.pre<Advert>("save", function preSave(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

const AdvertModel = modules.mongoose.model<Advert>(
  "Advert",
  AdvertSchema
);

export default AdvertModel;
