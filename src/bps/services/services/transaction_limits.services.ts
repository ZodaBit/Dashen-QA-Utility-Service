import mongoose from "mongoose";
import fs from "fs/promises";
import { TransactionLimitsModel } from "../model/transaction_limits.model.js";
import { link } from "fs";

const test_data = process.env.BATCH_TAG || "test_data";
function convertExtendedJSON(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertExtendedJSON);
  }

  if (obj && typeof obj === "object") {
    if (obj.$date) {
      if (typeof obj.$date === "string") return new Date(obj.$date);
      if (obj.$date.$numberLong) return new Date(Number(obj.$date.$numberLong));
    }

    if (obj.$numberLong) return Number(obj.$numberLong);
    if (obj.$numberInt) return Number(obj.$numberInt);
    if (obj.$oid) return obj.$oid.toString();
    if (obj.$binary) return Buffer.from(obj.$binary.base64, "base64");

    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = convertExtendedJSON(obj[key]);
    }
    return newObj;
  }

  return obj;
}

function cleanEnumFields(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanEnumFields);
  }

  if (obj && typeof obj === "object") {
    for (const key in obj) {
      const val = obj[key];

      // Convert empty string → null
      if (val === "") {
        obj[key] = null;
        continue;
      }

      // Recurse
      if (typeof val === "object") cleanEnumFields(val);
    }
  }
  return obj;
}

export class TransactionLimitsService {
  private convertOid(doc: any): any {
    if (Array.isArray(doc)) return doc.map((d) => this.convertOid(d));

    if (doc && typeof doc === "object") {
      const newDoc: any = {};
      for (const key in doc) {
        if (doc[key] && typeof doc[key] === "object" && "$oid" in doc[key]) {
          newDoc[key] = new mongoose.Types.ObjectId(doc[key]["$oid"]);
        } else {
          newDoc[key] = this.convertOid(doc[key]);
        }
      }
      return newDoc;
    }

    return doc;
  }

  public async insertTransactionLimits(buffer: Buffer): Promise<string> {
    try {
      const bufferStr = buffer.toString("utf-8");
      let transaction_limits = JSON.parse(bufferStr);
      transaction_limits = convertExtendedJSON(transaction_limits);
      transaction_limits = cleanEnumFields(transaction_limits);
      transaction_limits.batch_tag = test_data;
      const insertedDoc = (await TransactionLimitsModel.insertOne(
        transaction_limits
      )) as any;

      // convert objectId to string
      const id = insertedDoc._id.toString();
      return id;
    } catch (err) {
      throw err;
    }
  }

  
   deleteTransactionLimitById(user: string): Promise<any> {
    try{
      return TransactionLimitsModel.deleteOne({ user: new mongoose.Types.ObjectId(user) });
    }catch(err){
        console.log(err);
      throw err;
    }
    }

  deleteTestData(): Promise<any> {
    return TransactionLimitsModel.deleteMany({ batch_tag: test_data });
  }
}
