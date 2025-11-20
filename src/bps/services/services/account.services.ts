import mongoose from "mongoose";
import fs from "fs/promises";
import { AccountModel } from "../model/account.model.js";

const test_data=process.env.BATCH_TAG || "test_data";
export class AccountService {

   public async insertAccount(buffer:Buffer):Promise<string>{
       try {
      const bufferStr = buffer.toString('utf-8');
      const accountData = JSON.parse(bufferStr);
      accountData.batch_tag = test_data;
      const insertedDoc = await AccountModel.insertOne(accountData)as any;

      // convert objectId to string
      const id = insertedDoc._id.toString();

      return id;
    } catch (err) {
      throw err;
    }
  }

   deleteTestAccount(): Promise<any> {
      return AccountModel.deleteMany({ batch_tag: test_data });
    }

}


