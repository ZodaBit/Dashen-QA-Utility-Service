import mongoose, { Schema, Document } from "mongoose";

export interface IMiniApp extends Document {
  _id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;

  app_name: string;
  app_icon: string;
  banner_image: string;
  app_type: string;
  merchant_id: mongoose.Types.ObjectId;

  product_code: {
    _id: string;
    branch_type: string;
    product_code: string;
    vat_code: string;
    service_fee_code: string;
  }[];

  credential: {
    environment: string;
    merchant_app_id: string;
    fabric_app_id: string;
    short_code: string;
    app_secret: string;
    private_key: string;
    public_key: string;
    timestamp: Date;
    signature: string;
    mini_app_code: string;
  };

  url: string;
  app_view_type: string;
  stage: string;

  app_mode:string;

  enabled: boolean;
  is_deleted: boolean;
  created_at: Date;
  last_modified_at: Date;
  deleted_at: Date | null;
  batch_tag: string;
}

const MiniAppSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },

    category_id: { type: mongoose.Types.ObjectId, required: true },

    app_name: { type: String, required: true },
    app_icon: { type: String, required: true },
    banner_image: { type: String, default: "" },

    app_type: { type: String, required: true },
    merchant_id: { type: mongoose.Types.ObjectId, required: true },

    product_code: [
      {
        _id: { type: String },
        branch_type: { type: String },
        product_code: { type: String },
        vat_code: { type: String },
        service_fee_code: { type: String },
      },
    ],

    credential: {
      environment: { type: String },
      merchant_app_id: { type: String },
      fabric_app_id: { type: String },
      short_code: { type: String },
      app_secret: { type: String },
      private_key: { type: String },
      public_key: { type: String },
      timestamp: { type: Date },
      signature: { type: String },
      mini_app_code: { type: String },
    },

    url: { type: String },
    app_view_type: { type: String },
    stage: { type: String },

   app_mode:{type:String},

    enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    last_modified_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    batch_tag: { type: String },
  },
  { collection: "mini_app", versionKey: false }
);

export const MiniAppModel = mongoose.model<IMiniApp>("MiniApp", MiniAppSchema);
