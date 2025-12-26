import type { Request, Response } from "express";
import multer from "multer";
import fs from "fs";

/**
 * Creates a reusable controller for import operations
 * @param service - service instance with insert, bulkInsert, delete
 * @param folder - folder where files are uploaded
 */
export function BaseController(service: any, folder: string) {
  const upload = multer({
    dest: `uploads/${folder}/`,
    fileFilter: (req, file, cb) => {
      if (!file.originalname.endsWith(".json")) {
        return cb(new Error("Only .json files are allowed"));
      }
      cb(null, true);
    },
  });

  return {
    insert: [
      upload.single("file"),
      async (req: Request, res: Response) => {
        try {
          if (!req.file) {
            return res.status(400).json({ error: "JSON file is required" });
          }

          const fileBuffer = fs.readFileSync(req.file.path);
          const insertedId = await service.insert(fileBuffer);

          fs.unlinkSync(req.file.path);

          return res.json({
            message: "Data inserted successfully.",
            insertedIds: [insertedId],
          });
        } catch (err: any) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
      },
    ],

    bulkInsert: [
      upload.array("files"),
      async (req: Request, res: Response) => {
        try {
          const files = req.files as Express.Multer.File[];

          if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
          }

          const insertedIds = await service.bulkInsert(files);

          // Cleanup uploaded files
          for (const file of files) {
            try {
              fs.unlinkSync(file.path);
            } catch (err) {
              console.warn(`Failed to delete file ${file.path}: ${err}`);
            }
          }

          return res.json({
            message: `${insertedIds.length} data inserted successfully`,
            insertedIds,
          });
        } catch (err: any) {
          return res.status(500).json({ error: err.message });
        }
      },
    ],

    delete: async (req: Request, res: Response) => {
      try {
        const result = await service.delete();
        return res.json({
          message: "Deleted test data",
          deleted: result.deletedCount,
        });
      } catch (err: any) {
        return res.status(500).json({ error: err.message || err });
      }
    },
  };
}
