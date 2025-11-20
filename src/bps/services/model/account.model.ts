import mongoose ,{Schema} from "mongoose";
const AccountSchema : Schema= new Schema({
},{ collection: "bps_banking",versionKey: false,strict: false });
export const AccountModel = mongoose.model("Account", AccountSchema);