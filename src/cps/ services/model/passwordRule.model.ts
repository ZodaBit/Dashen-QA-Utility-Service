import mongoose from "mongoose";
import { PasswordRule } from "../config/types/passwordRule";
import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { PortalsEnum } from "../utils/enums/portal.enum";

const Schema = mongoose.Schema;

const passwordRuleSchema = new Schema<PasswordRule>(
  {
    passwordId: {
      type: String,
      required: false,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      enum: Object.values(PortalsEnum),
    },
    minLength: {
      type: Number,
      required: true,
      min: 1,
    },
    maxLength: {
      type: Number,
      required: true,
      min: 1,
    },
    numbers: {
      type: Boolean,
      default: false,
    },
    capitalLetters: {
      type: Boolean,
      default: false,
    },
    smallLetters: {
      type: Boolean,
      default: false,
    },
    characters: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add mongoose-troop middleware to support pagination
passwordRuleSchema.plugin(modules.paginator);

// Create the Model
const PasswordRuleModel = mongoose.model<PasswordRule, PaginateModel<PasswordRule>>(
  "PasswordRule",
  passwordRuleSchema
);

export default PasswordRuleModel;
