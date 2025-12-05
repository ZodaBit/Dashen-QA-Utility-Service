import mongoose, { Schema, Document } from "mongoose";

export interface IBudgetCategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  color: string;
  icon: string;
  enabled: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
   batch_tag: string;
}

const BudgetCategorySchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    name: { type: String },
    color: { type: String },
    icon: { type: String },

    enabled: { type: Boolean },
    is_deleted: { type: Boolean },

    created_at: { type: Date },
    updated_at: { type: Date },
    batch_tag: { type: String },
  },
  { collection: "budget_category", versionKey: false }
);

export const BudgetCategoryModel = mongoose.model<IBudgetCategory>(
  "BudgetCategory",
  BudgetCategorySchema
);
