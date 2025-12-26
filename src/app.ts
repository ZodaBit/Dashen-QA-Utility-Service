import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./bps/utils/mongo.js";
import accessListRoutes from "./bps/routes/accessList.routes.js";
import UserRoutes from "./bps/routes/user.routes.js";
import linkedAccountRoutes from "./bps/routes/linked_account.routes.js";
import TransactionLimitRoutes from "./bps/routes/transaction_limit.routes.js";

import archivedUserRoutes from "./cps/routes/archived_users.routes.js";
import archivedLinkedAccountRoutes from "./cps/routes/archived_linked_account.routes.js";
import AvatarRoutes from "./cps/routes/avatar.routes.js";
import PortalCardRoutes from "./cps/routes/portal_card.routes.js";
import BudgetCategoryRoutes from "./cps/routes/budget_category.routes.js";
import AdvertRoutes from "./cps/routes/advert.routes.js";
import NotificationsRoutes from "./cps/routes/notifications.routes.js";
import MiniAppRoutes from "./cps/routes/mini_app.routes.js";
import MiniAppCategoryRoutes from "./cps/routes/mini_app_category.routes.js";
import MiniAppMerchantRoutes from "./cps/routes/mini_app_merchant.routes.js";
import DonationCategoryRoutes from "./cps/routes/donation_Category.routes.js";
import DonationCompanyRoutes from "./cps/routes/donation_compnay.routes.js";
import DonationRoutes from "./cps/routes/donation.routes.js";
dotenv.config();

const app = express();
///api/v1/cbesuperapp/qaservice
const PORT = process.env.PORT || 4500;

app.use(express.json());

const qaServiceRouter = express.Router();

qaServiceRouter.use("/access_list", accessListRoutes);
qaServiceRouter.use("/user", UserRoutes);
qaServiceRouter.use("/account", linkedAccountRoutes);
qaServiceRouter.use("/transaction_limit", TransactionLimitRoutes);

qaServiceRouter.use("/archived_user", archivedUserRoutes);
qaServiceRouter.use("/archived_linked_account", archivedLinkedAccountRoutes);
qaServiceRouter.use("/avatar", AvatarRoutes);
qaServiceRouter.use("/portal_card", PortalCardRoutes);
qaServiceRouter.use("/budget_category", BudgetCategoryRoutes);
qaServiceRouter.use("/advert", AdvertRoutes);
qaServiceRouter.use("/notifications", NotificationsRoutes);
qaServiceRouter.use("/mini_app", MiniAppRoutes);
qaServiceRouter.use("/mini_app_category", MiniAppCategoryRoutes);
qaServiceRouter.use("/mini_app_merchant", MiniAppMerchantRoutes);
qaServiceRouter.use("/donation_category", DonationCategoryRoutes);
qaServiceRouter.use("/donation_company", DonationCompanyRoutes);
qaServiceRouter.use("/donation", DonationRoutes);
qaServiceRouter.get("/health", (req, res) => res.json({ status: "ok" }));


app.use("/api/v1/dashen/qaservice", qaServiceRouter);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
