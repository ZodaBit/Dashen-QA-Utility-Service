import mongoose from "mongoose";
import { MiniAppModel } from "../model/mini_app.model.js";
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

export class MiniAppService {
 
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
      let mini_app = JSON.parse(bufferStr);
      mini_app = convertExtendedJSON(mini_app);
     mini_app = cleanEnumFields(mini_app);
      mini_app.batch_tag = test_data;
      const insertedDoc = (await MiniAppModel.insertOne(
        mini_app
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
        const AvatarDocs: any[] = [];
  
        for (const file of files) {
          const buffer = fs.readFileSync(file.path);
          const bufferStr = buffer.toString("utf-8");
          let mini_app_data = JSON.parse(bufferStr);
  
          mini_app_data = convertExtendedJSON(mini_app_data);
          mini_app_data = cleanEnumFields(mini_app_data);
          mini_app_data.batch_tag = test_data;
          AvatarDocs.push(mini_app_data);
        }
  
        // Bulk insert
        const insertedDocs = await MiniAppModel.insertMany(AvatarDocs);
  
        // Return all inserted _id as string
        return insertedDocs.map((doc) => doc._id.toString());
      } catch (err) {
        throw err;
      }
    }


  delete(): Promise<any> {
    return MiniAppModel.deleteMany({ batch_tag: test_data });
  }
}
