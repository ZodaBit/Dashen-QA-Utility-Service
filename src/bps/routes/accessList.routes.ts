import { Router } from "express";
import {
  insertAccessList,
  deleteAccessLists,
} from "../controllers/accessList.controller.js";

const router = Router();

router.post("/insert_access_list", insertAccessList);
router.delete("/delete_test_data", deleteAccessLists);

export default router;
