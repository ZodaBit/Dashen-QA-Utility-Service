import mongoose, { Schema } from "mongoose";

export interface Icheque extends Document{
  user_id: string;
  cheque_number: string;
  receiver_name: string;
  receiver_phone: string;
  action_code: string;
  branch_code: string;
  amount: string;
  status: string;
  reason: string;
  attachment: string;
  created_at: string;
  last_modified_at: string;
  batch_tag: string;
    
}

const ChequeSchema : Schema= new Schema({
   user_id: String,
  cheque_number:  String,
  receiver_name:  String,
  receiver_phone:  String,
  action_code:  String,
  branch_code:  String,
  amount:  String,
  status:  String,
  reason:  String,
  attachment:  String,
  created_at:  String,
  last_modified_at:  String,
  batch_tag:  String,
},{ collection: "cheque",versionKey: false });
export const ChequeModel = mongoose.model<Icheque>("Cheque", ChequeSchema);
