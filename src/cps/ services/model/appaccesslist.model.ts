
import { ServiceAccessList } from "../config/types/service-access";
import modules from "./imports/index";
import { type PaginateModel } from "mongoose";


const Schema = modules.mongoose.Schema;

const APPAccessListSchema = new Schema<ServiceAccessList>({
    key: { type: String },
    enabled: { type: Boolean, default: true },
    accessListName: { type: String },
    subAccessList: [{ type: Object }],
});

APPAccessListSchema.plugin(modules.paginator);

APPAccessListSchema.pre<ServiceAccessList>(
    "save",
    function preSaveMiddleware(next) {
        const now = modules.moment().toDate();

        next();
    }
);

const APPAccessListModel = modules.mongoose.model<
    ServiceAccessList,
    PaginateModel<ServiceAccessList>
>("APPAccessList", APPAccessListSchema);

export default APPAccessListModel;
