import type { Request, Response } from "express";
import { ArchivedLinkedAccountService } from "../ services/services/archived_linked_account.services.js";
import { BaseController } from "../utils/base_controller.js";

const service = new ArchivedLinkedAccountService();
const baseController = BaseController(service, "archived_linked_account");

export const ArchivedLinkedAccountController = {
  ...baseController,
  searchAccountAndDelete: async (req: Request, res: Response) => {
    try {
      const { account_number } = req.params;

      if (!account_number) {
        return res.status(400).json({
          message: "account_number parameter is required",
        });
      }
      // 1. Search → return _id
      const id = await service.searchArchivedAccount(account_number);

      if (!id) {
        return res.status(404).json({
          message: "Linked account not found",
        });
      }
      // 2. Delete using _id
      const deleteResult = await service.deleteArchivedAccountById(id);

      return res.json({
        message: "Linked account deleted successfully",
        _id: id,
        deleteResult,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err instanceof Error ? err.message : err });
    }
  },
};
