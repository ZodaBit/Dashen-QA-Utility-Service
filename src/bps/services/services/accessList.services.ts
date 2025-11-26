import csv from "csv-parser";
import { AccessListModel } from "../model/accessList.model.js";
import { Readable } from "stream";


const test_data=process.env.BATCH_TAG || "test_data";
export class AccessListService {
  private subAccessList = [
    {
      key: "domestic_transfer",
      enabled: true,
      access_list_name: "Domestic Transfer",
    },
    { key: "bill_pay", enabled: true, access_list_name: "Bill Payment" },
  ];

  insertFromCsvBuffer(fileBuffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const docs: any[] = [];
      let index = 0;
      const stream = Readable.from(fileBuffer.toString());
      stream
        .pipe(csv())
        .on("data", (row) => {
          if (index >= 32) return;
          docs.push({
            key: `branch_${row.key}`,
            enabled: row.enabled === "true",
            sub_access_list: index < 16 ? this.subAccessList : [],
            u_s_s_d_enabled: row.u_s_s_d_enabled === "true",
            access_list_name: row.access_list_name,
            batch_tag: test_data,
          });
          index++;
        })
        .on("end", async () => {
          if (docs.length === 0) return reject("No valid data found in CSV");
          console.log("Docs to insert:", docs);

          try {
            const insertedDocs = await AccessListModel.insertMany(docs);
            resolve(insertedDocs.map(doc=> ({
              id: doc._id.toString(),
              key: doc.key
            })));
          } catch (err) {
            reject(err);
          }
        
        })
        .on("error", reject);
    });
  }
  deleteTestAccessList(): Promise<any> {
    return AccessListModel.deleteMany({ batch_tag: test_data });
  }
}
