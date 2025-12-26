import { MiniappProduct } from "../config/types/miniappProduct";
import { ProductCodes } from "../lib/service-shared-types";
import { MiniappMerchantType } from "../utils/enums/miniappMerchant.enum";
import modules from "./imports/index";
import { type PaginateModel } from "mongoose";

const Schema = modules.mongoose.Schema;

const MiniappProductSchema = new Schema(
    {
        miniappMerchantType: { type: String, enum: MiniappMerchantType },
        // accountType: { type: String, enum:["IFB","CB","ALL"]},
        productCodes: ProductCodes,
        IFBproductCodes: ProductCodes,
        enabled: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

MiniappProductSchema.plugin(modules.paginator);

const MiniappProductModel = modules.mongoose.model<MiniappProduct, PaginateModel<MiniappProduct>>(
  "MiniappProduct",
  MiniappProductSchema
);

export default MiniappProductModel;
