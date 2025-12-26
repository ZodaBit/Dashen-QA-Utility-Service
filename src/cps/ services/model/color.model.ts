import { Color } from "../config/types/color";
import modules from "./imports/index";
import mongoose, { type PaginateModel } from "mongoose";

const Schema = modules.mongoose.Schema;

const colorSchema = new Schema({
  color: { type: String },

  createdAt: { type: Date },
  lastModified: { type: Date },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

colorSchema.plugin(modules.paginator);

colorSchema.pre("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;
  next();
});

const colorCategoryModel = mongoose.model<Color, PaginateModel<Color>>("color", colorSchema);

export default colorCategoryModel;
