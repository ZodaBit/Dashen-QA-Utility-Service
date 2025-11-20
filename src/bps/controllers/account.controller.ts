import type { Request, Response } from "express";
import { AccountService } from "../services/services/account.services.js";
import Busboy from "busboy";

const service = new AccountService();

export const insertAccount = async (req: Request, res: Response) => {
  const busboy = Busboy({ headers: req.headers });
  let fileBuffer: Buffer | null = null;
  let fileName = "";
  let fileMimeType = "";

  busboy.on("file", (fieldname, file, info) => {
    fileName = info.filename;
    fileMimeType = info.mimeType;
    if(!fileName.endsWith(".json")){
        file.resume();
        return res.status(400).json({ error: " JSON files is required" });
    }

    const chunks: Buffer[] = [];
    file.on("data", (data) => chunks.push(data));
    file.on("end", () => {
      fileBuffer = Buffer.concat(chunks);
    });

  });


  busboy.on("finish", async () => {
    try {
      if (!fileBuffer)
        return res.status(400).json({ error: "json  file is required" });
         const ids = await service.insertAccount(fileBuffer);
      res.json({
         message: `Inserted ${ids.length} account successfully.`
        , insertedIds: ids
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
  req.pipe(busboy);
};


export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const result = await service.deleteTestAccount();
    res.json({
      message: "Deleted test accounts",
      deleted: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};