import mongoose from "mongoose";
import fs from "fs/promises";
import { memberModel } from "../model/member.model.js";


const test_data=process.env.BATCH_TAG || "test_data";
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


export class MemberService {
  
    private convertOid(doc: any): any {
    if (Array.isArray(doc)) return doc.map(d => this.convertOid(d));

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

   public async insertMember(buffer:Buffer):Promise<string>{
       try {
      const bufferStr = buffer.toString('utf-8');
      let memberData = JSON.parse(bufferStr);
       memberData = convertExtendedJSON(memberData);
       memberData = cleanEnumFields(memberData); 
      memberData.batch_tag = test_data;
      const insertedDoc = await memberModel.insertOne(memberData)as any;

      // convert objectId to string
      const id = insertedDoc._id.toString();
      const device_uuid=insertedDoc.device_uuid;
      const app_installation_date=insertedDoc.app_installation_date;

      return id;
    } catch (err) {
      throw err;
    }
  }

   deleteTestData(): Promise<any> {
      return memberModel.deleteMany({ batch_tag: test_data });
    }

    

}


