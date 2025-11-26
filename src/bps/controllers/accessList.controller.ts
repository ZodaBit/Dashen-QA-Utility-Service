import type { Request, Response } from "express";
import { AccessListService } from "../services/services/accessList.services.js";
import Busboy from "busboy";

const service = new AccessListService();

export const insertAccessList = async (req: Request, res: Response) => {
  const busboy = Busboy({ headers: req.headers });
  let fileBuffer: Buffer | null = null;
  let test_tag = "";

  busboy.on("file", (fieldname, file, info) => {
    const chunks: Buffer[] = [];
    file.on("data", (data) => chunks.push(data));
    file.on("end", () => {
      fileBuffer = Buffer.concat(chunks);
    });
  });


  busboy.on("finish", async () => {
    try {
      if (!fileBuffer)
        return res.status(400).json({ error: "CSV file is required" });

      const inserted = await service.insertFromCsvBuffer(fileBuffer);
      const keys=inserted.map(doc=>doc.key);
      console.log("Inserted IDs:", keys);
      res.json({
       keys
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
  req.pipe(busboy);
};

export const deleteAccessLists = async (req: Request, res: Response) => {
  try {
    const result = await service.deleteTestAccessList();
    res.json({
      message: "Deleted test access lists",
      deleted: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
