import mongoose, { Schema } from "mongoose";

//

export interface IlinkedAccount extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  account_number: String;
  account_holder_name: String;
  branch_code: String;
  customer_number: String;
  linked_status: Boolean;
  last_linked_status: Boolean;
  has_action: Boolean;
  linker_branch_code: String;
  registration_type: String;
  currency: String;
  is_main: Boolean;
  is_blocked: Boolean;
  linked_at: Date;
  created_at: Date;
  last_modified_at: Date;
  batch_tag: string;
}

const LinkedAccountSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    account_number: { type: String },
    account_holder_name: { type: String },
    branch_code: { type: String },
    customer_number: { type: String },
    linked_status: { type: Boolean },
    last_linked_status: { type: Boolean },
    has_action: { type: Boolean },
    linker_branch_code: { type: String },
    registration_type: { type: String },
    currency: { type: String },
    is_main: { type: Boolean },
    is_blocked: { type: Boolean },
    linked_at: { type: Date },
    created_at: { type: Date },
    last_modified_at: { type: Date },
    batch_tag: { type: String },
  },
  { collection: "linked_account", versionKey: false }
);
export const linkedAccountModel = mongoose.model<IlinkedAccount>("LinkedAccount", LinkedAccountSchema);
