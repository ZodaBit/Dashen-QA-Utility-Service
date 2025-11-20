import csv from "csv-parser";
import { ChequeModel } from "../model/cheque.model.js";
import { Readable } from "stream";


const test_data=process.env.BATCH_TAG || "test_data";
export class ChequeService {

  insertFromCsvBuffer(fileBuffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const docs: any[] = [];
      let index = 0;
      const stream = Readable.from(fileBuffer.toString("utf-8"));
      stream
        .pipe(csv())
        .on("data", (row) => {
       
          docs.push({
            user_id: "CBEUSR-353073833270", // static or dynamic
            cheque_number: row.cheque_number.trim(),
            receiver_name: row.receiver_name.trim(),
            receiver_phone: row.receiver_phone.trim(),
            action_code: row.action_code.trim(),
            branch_code: row.branch_code.trim(),
            amount: row.amount.trim(),
            status: row.status.trim(),
            reason: row.reason.trim(),
            attachment: row.attachment.trim(),
            created_at: row.created_at.trim(),
            last_modified_at: row.last_modified_at.trim(),
            batch_tag: test_data,
          });
          index++;
        })
        .on("end", async () => {
          if (docs.length === 0) return reject("No valid data found in CSV");
          console.log("Docs to insert:", docs);

          try {
            const insertedDocs = await ChequeModel.insertMany(docs);
            const ids = insertedDocs.map(d => d._id.toString());
            resolve(ids); // returns documents WITH MongoDB IDs
          } catch (err) {
            reject(err);
          }
        
        })
        .on("error", reject);
    });
  }
  deleteTesData(): Promise<any> {
    return ChequeModel.deleteMany({ batch_tag: test_data });
  }
}
