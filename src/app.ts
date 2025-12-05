import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./bps/utils/mongo.js";
import accessListRoutes from "./bps/routes/accessList.routes.js";
import accountRoutes from "./bps/routes/account.routes.js";
import chequeRoutes from "./bps/routes/cheque.routes.js";
import memberRoutes from "./bps/routes/member.routes.js";
import linkedAccountRoutes from "./bps/routes/linked_account.routes.js";
import TransactionLimitsRoutes from "./bps/routes/transaction_limits.routes.js";
import archivedUserRoutes from "./cps/routes/archived_users.routes.js";
import archivedLinkedAccountRoutes from "./cps/routes/archived_linked_account.routes.js";
import AvatarRoutes from "./cps/routes/avatar.routes.js";
import PortalCardRoutes from "./cps/routes/portal_card.routes.js";
import BudgetCategoryRoutes from "./cps/routes/budget_category.routes.js";

dotenv.config();

const app = express();
///api/v1/cbesuperapp/qaservice
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use("/api/v1/cbesuperapp/qaservice/access_list", accessListRoutes);
app.use("/api/v1/cbesuperapp/qaservice/account", accountRoutes);
app.use("/api/v1/cbesuperapp/qaservice/cheque",chequeRoutes );
app.use("/api/v1/cbesuperapp/qaservice/member",memberRoutes );
app.use("/api/v1/cbesuperapp/qaservice/linked_account",linkedAccountRoutes );
app.use("/api/v1/cbesuperapp/qaservice/transaction_limit",TransactionLimitsRoutes );
app.use("/api/v1/cbesuperapp/qaservice/archived_user",archivedUserRoutes);
app.use("/api/v1/cbesuperapp/qaservice/archived_linked_account",archivedLinkedAccountRoutes);
app.use("/api/v1/cbesuperapp/qaservice/avatar",AvatarRoutes);
app.use("/api/v1/cbesuperapp/qaservice/portal_card",PortalCardRoutes);
app.use("/api/v1/cbesuperapp/qaservice/budget_category",BudgetCategoryRoutes);

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
