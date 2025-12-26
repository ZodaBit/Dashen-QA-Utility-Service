import modules from "./imports/index";
import { type PaginateModel } from "mongoose";
import { type AppVersion } from "../config/types/appVersionHistory";

const Schema = modules.mongoose.Schema;

const AppVersionSchema = new Schema<AppVersion>({
  version: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return /^\d+\.\d+\.\d+$/.test(v); // matches 1.0.0, 10.3.25, etc.
      },
      message: 'Version must follow semantic versioning (x.y.z)'
    }
  },
  platform: { 
    type: String, 
    required: true,
    enum: ["ios", "android"]
  },
  releaseNotes: { 
    type: String,
    maxlength: 2000
  },
  enabled: { 
    type: Boolean, 
    default: true 
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  previousVersion: { 
    type: String 
  },
});


AppVersionSchema.index({ platform: 1, enabled: 1 });
AppVersionSchema.index({ platform: 1, version: 1 }, { unique: true });

AppVersionSchema.plugin(modules.paginator);


const AppVersionHistoryModel = modules.mongoose.model<AppVersion, PaginateModel<AppVersion>>(
  "AppVersion", 
  AppVersionSchema,
);

export default AppVersionHistoryModel;
