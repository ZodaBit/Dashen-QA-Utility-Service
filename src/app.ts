import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./bps/utils/mongo.js";
import accessListRoutes from "./bps/routes/accessList.routes.js";
import UserRoutes from "./bps/routes/user.routes.js";
import linkedAccountRoutes from "./bps/routes/linked_account.routes.js";

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
app.use("/api/v1/cbesuperapp/qaservice/access_list", accessListRoutes);
app.use("/api/v1/cbesuperapp/qaservice/user",UserRoutes );
app.use("/api/v1/cbesuperapp/qaservice/account",linkedAccountRoutes );
app.use("/api/v1/cbesuperapp/qaservice/archived_user",archivedUserRoutes);
app.use("/api/v1/cbesuperapp/qaservice/archived_linked_account",archivedLinkedAccountRoutes);
app.use("/api/v1/cbesuperapp/qaservice/avatar",AvatarRoutes);
app.use("/api/v1/cbesuperapp/qaservice/portal_card",PortalCardRoutes);
app.use("/api/v1/cbesuperapp/qaservice/budget_category",BudgetCategoryRoutes);
app.use("/api/v1/cbesuperapp/qaservice/advert",AdvertRoutes);
app.use("/api/v1/cbesuperapp/qaservice/notifications",NotificationsRoutes);
app.use("/api/v1/cbesuperapp/qaservice/mini_app",MiniAppRoutes);
app.use("/api/v1/cbesuperapp/qaservice/mini_app_category",MiniAppCategoryRoutes);
app.use("/api/v1/cbesuperapp/qaservice/mini_app_merchant",MiniAppMerchantRoutes);
app.use("/api/v1/cbesuperapp/qaservice/donation_category",DonationCategoryRoutes);
app.use("/api/v1/cbesuperapp/qaservice/donation_company",DonationCompanyRoutes);
app.use("/api/v1/cbesuperapp/qaservice/donation",DonationRoutes);


app.get("/api/v1/cbesuperapp/qaservice/health", (req, res) => res.json({ status: "ok" }));

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
