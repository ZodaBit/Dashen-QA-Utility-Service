import fs from "fs";
import { convertExtendedJSON, cleanEnumFields } from "./data_sanitizer.js";

const BATCH_TAG = process.env.BATCH_TAG || "test_data";

export class BaseService<T> {
  constructor(private readonly model: any) {}

  async insert(buffer: Buffer): Promise<string> {
    const bufferStr = buffer.toString("utf-8");
    let data = JSON.parse(bufferStr);

    data = convertExtendedJSON(data);
    data = cleanEnumFields(data);
    data.batch_tag = BATCH_TAG;

    const insertedDoc = await this.model.insertOne(data);
    return insertedDoc._id.toString();
  }

  async bulkInsert(files: Express.Multer.File[]): Promise<string[]> {
    const docs: T[] = [];

    for (const file of files) {
      const buffer = fs.readFileSync(file.path);
      let data = JSON.parse(buffer.toString("utf-8"));

      data = convertExtendedJSON(data);
      data = cleanEnumFields(data);
      data.batch_tag = BATCH_TAG;

      docs.push(data);
    }

    const insertedDocs = await this.model.insertMany(docs);
    return insertedDocs.map((doc: any) => doc._id.toString());
  }

  delete(): Promise<any> {
    return this.model.deleteMany({ batch_tag: BATCH_TAG });
  }
}
