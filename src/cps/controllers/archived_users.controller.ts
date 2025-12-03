import type { Request, Response } from "express";
import { ArchivedUserService } from "../ services/services/archived_users.services.js"; // FIXED PATH
import multer from "multer";
import fs from "fs";

// Multer: Only accept .json files, store in uploads folder
const upload = multer({
  dest: "uploads/archived_users/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".json")) {
      return cb(new Error("Only .json files are allowed"));
    }
    cb(null, true);
  },
});

const service = new ArchivedUserService();

/**
 * ----------------------------------------------
 * INSERT SINGLE ARCHIVED USER (file: .json)
 * ----------------------------------------------
 */
export const insertArchivedUsers = [
  upload.single("file"), // Field name MUST be `file`
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "JSON file is required" });
      }

      const fileBuffer = fs.readFileSync(req.file.path);

      // Service call
      const ids = await service.insertArchivedUsersAccount(fileBuffer);

      // Cleanup uploaded file
      fs.unlinkSync(req.file.path);

      return res.json({
        message: "Inserted archived user successfully.",
        insertedIds: ids,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  },
];

/**
 * ----------------------------------------------
 * INSERT BULK ARCHIVED USERS (multiple .json files)
 * ----------------------------------------------
 */
export const insertArchivedUsersBulk = [
  upload.array("files"), // Field name MUST be `files`
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const insertedIds = await service.bulkInsertArchivedUsers(files);

      // Delete uploaded files
      for (const file of files) {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.warn(`Failed to delete file ${file.path}: ${err}`);
        }
      }

      return res.json({
        message: `Inserted ${insertedIds.length} archived users in bulk successfully`,
        insertedIds,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
];

/**
 * ----------------------------------------------
 * DELETE ARCHIVED USER TEST DATA
 * (NO FILE NEEDED — Multer NOT used)
 * ----------------------------------------------
 */
export const deleteTestData = async (req: Request, res: Response) => {
  try {
    const result = await service.deleteTestData();
    return res.json({
      message: "Deleted test data",
      deleted: result.deletedCount,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
