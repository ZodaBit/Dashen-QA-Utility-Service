import { Currency } from "../config/types/currency";
import modules from "./imports/index";
import { type PaginateModel } from "mongoose";

const Schema = modules.mongoose.Schema;

const CurrencySchema = new Schema<Currency>({
  currencyCode: { type: String },
  currencyName: { type: String },
});

// add mongoose-troop middleware to support pagination
CurrencySchema.plugin(modules.paginator);

const currencyModel = modules.mongoose.model<Currency, PaginateModel<Currency>>(
  "Currency",
  CurrencySchema
);

// Expose the User Model
export default currencyModel;
