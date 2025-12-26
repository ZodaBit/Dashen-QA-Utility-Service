import { LinkedAccount } from '../config/types/linkedaccounts';
import modules from './imports/index';
import mongoose, { type Document, type Model } from 'mongoose';

const Schema = modules.mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LinkedAccountSchema = new Schema<LinkedAccount & Document>(
    {
        user: { type: ObjectId, ref: 'User', required: true, index: true },
        accountNumber: { type: String, required: true, index: true },
        linkedStatus: { type: Boolean, default: false },
        accountHolderName: { type: String },
        lastLinkedStatus: { type: Boolean },
        linkedDate: { type: Date },
        accountType: { type: String },
        isAccountActive: { type: Boolean },
        andOrStatus: { type: Boolean },
        AccountBranchCode: { type: String },
        ussdLinkedStatus: { type: Boolean, default: false },
        linkedBranch: { type: String },
        linkerMaker: { type: String },
        linkerChecker: { type: String },
        unlinkerMaker: { type: String },
        unlinkerChecker: { type: String },
    },
    {
        timestamps: true, // createdAt, updatedAt
        // collection: 'LinkedAccounts',
    },
);

// optional compound index to ensure one account entry per user/account combo
LinkedAccountSchema.index(
    { user: 1, accountNumber: 1, createdAt: 1 },
    { unique: true, sparse: true },
);
const linkedAccountModel: Model<LinkedAccount> =
    mongoose.model<LinkedAccount>('LinkedAccount', LinkedAccountSchema);


export default linkedAccountModel;