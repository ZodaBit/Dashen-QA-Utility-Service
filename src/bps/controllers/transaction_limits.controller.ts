import type { Request, Response } from "express";
import { TransactionLimitsService } from "../services/services/transaction_limits.services.js";
import Busboy from "busboy";

const service = new TransactionLimitsService();

export const insertTransactionLimits= async (req: Request, res: Response) => {
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
         const ids = await service.insertTransactionLimits(fileBuffer);
      res.json({
         message: `Inserted transaction limit successfully.`
        , insertedIds: ids
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
  req.pipe(busboy);
};


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

export const deleteTransactionLimitById= async (req: Request, res: Response) => {
  try{
  const { id } = req.params;

  if (!id) {
      return res.status(400).json({
        message: "id parameter is required",
      });
    }
       // 2. Delete using _id
    const deleteResult = await service.deleteTransactionLimitById(id);

    return res.json({
      message: "transaction limit deleted successfully",
      _id: id,
      deleteResult,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err instanceof Error ? err.message : err });
  }

  };