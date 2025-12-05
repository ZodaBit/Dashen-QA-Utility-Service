import mongoose from "mongoose";
import { ArchivedLinkedAccountModel } from "../model/archived_linked_account.model.js";
import fs from "fs";
import multer from "multer";

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

export class ArchivedLinkedAccountService {
 
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

  public async insert(buffer: Buffer): Promise<string> {
    try {
      const bufferStr = buffer.toString("utf-8");
      let archived_linked_account = JSON.parse(bufferStr);
      archived_linked_account = convertExtendedJSON(archived_linked_account);
      archived_linked_account = cleanEnumFields(archived_linked_account);
      archived_linked_account.batch_tag = test_data;
      const insertedDoc = (await ArchivedLinkedAccountModel.insertOne(
        archived_linked_account
      )) as any;

      // convert objectId to string
      const id = insertedDoc._id.toString();
      return id;
    } catch (err) {
      throw err;
    }
  }

   public async bulkInsert(files: Express.Multer.File[]): Promise<string[]> {
      try {
        const ArchivedLinkedAccountDocs: any[] = [];
  
        for (const file of files) {
          const buffer = fs.readFileSync(file.path);
          const bufferStr = buffer.toString("utf-8");
          let archived_linked_account_data = JSON.parse(bufferStr);
  
          archived_linked_account_data = convertExtendedJSON(archived_linked_account_data);
          archived_linked_account_data = cleanEnumFields(archived_linked_account_data);
          archived_linked_account_data.batch_tag = test_data;
          ArchivedLinkedAccountDocs.push(archived_linked_account_data);
        }
  
        // Bulk insert
        const insertedDocs = await ArchivedLinkedAccountModel.insertMany(ArchivedLinkedAccountDocs);
  
        // Return all inserted _id as string
        return insertedDocs.map((doc) => doc._id.toString());
      } catch (err) {
        throw err;
      }
    }

      public async searchArchivedAccount(account_number: string): Promise<any> {
        try {
          const doc = await ArchivedLinkedAccountModel.findOne({account_number}, { _id: 1 });
          return doc?._id?.toString() || null;
        } catch (err) {
          throw err;
        }
      }
      
       deleteArchivedAccountById(id: string): Promise<any> {
        try{
          return ArchivedLinkedAccountModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        }catch(err){
          throw err;
        }
        }

  delete(): Promise<any> {
    return ArchivedLinkedAccountModel.deleteMany({ batch_tag: test_data });
  }
}
