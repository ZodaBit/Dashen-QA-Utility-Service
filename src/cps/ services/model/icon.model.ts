import mongoose from "mongoose";
import { Icon } from "../config/types/icon";
import { type PaginateModel } from "mongoose";
import modules from "./imports/index";

const Schema = mongoose.Schema;

const iconSchema = new Schema(
  {
    icon: { type: String },

    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

iconSchema.plugin(modules.paginator);

const iconCategoryModel = mongoose.model<Icon, PaginateModel<Icon>>(
  "icon",
  iconSchema
);

export default iconCategoryModel;
