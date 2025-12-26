import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { MiniappCategory } from "../config/types/miniappCategory";

const Schema = modules.mongoose.Schema;

const MiniappCategorySchema = new Schema<MiniappCategory>(
    {
        name: { type: String },
        image: { type: String },
        description: { type: String },
        enabled: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

MiniappCategorySchema.plugin(modules.paginator);

const MiniappCategoryModel = modules.mongoose.model<MiniappCategory, PaginateModel<MiniappCategory>>(
  "MiniappCategory",
  MiniappCategorySchema
);

export default MiniappCategoryModel;
