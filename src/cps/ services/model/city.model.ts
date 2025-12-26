import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type City } from "../config/types/city";

const Schema = modules.mongoose.Schema;

const CitySchema = new Schema<City>({
  name: { type: String },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

// add mongoose-troop middleware to support pagination
CitySchema.plugin(modules.paginator);

CitySchema.pre<City>("save", function preSaveMiddleware(next) {
  const now = modules.moment().toDate();

  this.createdAt = now;
  this.lastModified = now;

  next();
});

const cityModel = modules.mongoose.model<City, PaginateModel<City>>(
  "City",
  CitySchema
);

// Expose the User Model
export default cityModel;
