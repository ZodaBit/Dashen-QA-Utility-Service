import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { InputValidation } from "../config/types/accountNumberRule";
import { 
  AccountNumberEntityType, 
  AccountNumberValidationFor, 
  AccountNumberIdentifier 
} from "../utils/enums/accountNumber.enum";


const Schema = modules.mongoose.Schema;

const InputValidationSchema = new Schema({
  entityType: {
    type: String,
    enum: Object.values(AccountNumberEntityType),
  },
  validationFor: {
    type: String,
    enum: Object.values(AccountNumberValidationFor),
  },
  identifier: {
    type: String,
    enum: Object.values(AccountNumberIdentifier),
  },
  minLength: { type: Number },
  maxLength: { type: Number },
  serviceID: { type: Schema.Types.ObjectId, ref: "Service" },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  lastModified: { type: Date },
});

InputValidationSchema.plugin(modules.paginator);

InputValidationSchema.pre<InputValidation>(
  "save",
  function preSaveMiddleware(next) {
    const now = modules.moment().toDate();

    this.createdAt = now;
    this.lastModified = now;

    next();
  }
);

InputValidationSchema.index({ lastModified: -1 });

// 1. Main query index: filters + date range + sorting
InputValidationSchema.index({
  entityType: 1,
  validationFor: 1,
});


InputValidationSchema.index({ isDeleted: 1 });


const InputValidationModel = modules.mongoose.model<
  InputValidation,
  PaginateModel<InputValidation>
>("InputValidation", InputValidationSchema);

export default InputValidationModel;
