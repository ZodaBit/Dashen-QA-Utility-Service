import mongoose, { Schema, Document } from "mongoose";

export interface IArchivedLinkedAccount extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  customer_number: string;
  account_number: string;
  account_holder_name: string;
  account_type: string;
  branch_code: string;
  linked_status: boolean;
  last_linked_status: boolean;
  linked_at: Date;
  linker_branch: string;
  registration_type: string;
  is_account_active: boolean;
  and_or_status: boolean;
  account_branch_code: string;
  curreny: string;
  is_main: boolean;

  maker_and_checker: {
    linkers: {
      maker: string;
      checker: string;
    };
    unlinkers: {
      maker: string;
      checker: string;
    };
  };

  created_at: Date;
  updated_at: Date;
  batch_tag: string;
}

const ArchivedLinkedAccountSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },

    customer_number: { type: String },
    account_number: { type: String },
    account_holder_name: { type: String },
    account_type: { type: String },
    branch_code: { type: String },

    linked_status: { type: Boolean },
    last_linked_status: { type: Boolean },

    linked_at: { type: Date },

    linker_branch: { type: String },
    registration_type: { type: String },

    is_account_active: { type: Boolean },
    and_or_status: { type: Boolean },

    account_branch_code: { type: String },
    curreny: { type: String },

    is_main: { type: Boolean },

    maker_and_checker: {
      linkers: {
        maker: { type: String },
        checker: { type: String },
      },
      unlinkers: {
        maker: { type: String },
        checker: { type: String },
      },
    },

    created_at: { type: Date },
    updated_at: { type: Date },
    batch_tag: { type: String },
  },
  { collection: "archived_linked_account", versionKey: false }
);

export const ArchivedLinkedAccountModel = mongoose.model<IArchivedLinkedAccount>(
  "ArchivedLinkedAccount",
  ArchivedLinkedAccountSchema
);
