import mongoose, { Schema } from "mongoose";

export interface IAccessList extends Document{
    key: string;
    enabled: boolean;
    sub_access_list: string[];
    u_s_s_d_enabled: boolean;
    access_list_name: string;
    batch_tag: string;
}

const AccessListSchema : Schema= new Schema({
 key: String,
  enabled: Boolean,
  sub_access_list: Array,
  u_s_s_d_enabled: Boolean,
  access_list_name: String,
  batch_tag: String
},{ collection: "access_list",versionKey: false });
export const AccessListModel = mongoose.model<IAccessList>("AccessList", AccessListSchema);