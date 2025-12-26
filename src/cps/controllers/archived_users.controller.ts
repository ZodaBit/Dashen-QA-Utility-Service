import type { Request, Response } from "express";
import { ArchivedUserService } from "../ services/services/archived_users.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new ArchivedUserService();
const baseController = BaseController(service, "archived_users");

export const ArchivedUserController = {
  insertArchivedUsers: baseController.insert,
  insertArchivedUsersBulk: baseController.bulkInsert,
  deleteTestData: baseController.delete,
  searchArchivedUserAndDelete: async (req: Request, res: Response) => {
    try {
      const { account_number } = req.params;

      if (!account_number) {
        return res.status(400).json({
          message: "account_number parameter is required",
        });
      }
      // 1. Search → return _id
      const id = await service.searcheArchivedUser(account_number);

      if (!id) {
        return res.status(404).json({
          message: "Archived user not found",
        });
      }
      // 2. Delete using _id
      const deleteResult = await service.deleteArchivedUserById(id);

      return res.json({
        message: "Archived user deleted successfully",
        _id: id,
        deleteResult,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err instanceof Error ? err.message : err });
    }
  },
};
