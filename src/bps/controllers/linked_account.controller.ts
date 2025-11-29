import type { Request, Response } from "express";
import { LinkedAccountService } from "../services/services/linked_account.services.js";
import Busboy from "busboy";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: "uploads/linked_accounts/" });
const service = new LinkedAccountService();

export const insertLinkedAccount = async (req: Request, res: Response) => {
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
         const ids = await service.insertLinkedAccount(fileBuffer);
      res.json({
         message: `Inserted linked account successfully.`
        , insertedIds: ids
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
  req.pipe(busboy);
};


export const insertLinkedAccountBulk = [
  upload.array("files"), // field name must match the uploaded files
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const insertedIds = await service.insertLinkedAccountFromFiles(files);

      // DELETE uploaded files after insertion
      for (const file of files) {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.warn(`Failed to delete file ${file.path}: ${err}`);
        }
      }


      res.json({
        message: "Inserted linked account in bulk successfully",
        insertedIds,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
];


export const deleteTestData = async (req: Request, res: Response) => {
  try {
    const result = await service.deleteTestData();
    res.json({
      message: "Deleted test data",
      deleted: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const searchLinkedAccountDelete = async (req: Request, res: Response) => {
  try{
  const { account_number } = req.params;

  if (!account_number) {
      return res.status(400).json({
        message: "account_number parameter is required",
      });
    }
// 1. Search → return _id
    const id = await service.searchLinkedAccount(account_number);

    if (!id) {
      return res.status(404).json({
        message: "Linked account not found",
      });
    }
       // 2. Delete using _id
    const deleteResult = await service.deleteLinkedAccountById(id);

    return res.json({
      message: "Linked account deleted successfully",
      _id: id,
      deleteResult,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err instanceof Error ? err.message : err });
  }

  };