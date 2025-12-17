import { Router } from "express";
import { UserController} from "../controllers/user.controller.js";


const router = Router();
const controller = UserController;

router.post("/insert", controller.insert);
router.delete("/delete", controller.delete);
router.post("/bulk_insert",controller.bulkInsert) 

export default router;