import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import authControl from "../controllers/auth";
import isAuthenticatedSales from "../middlewares/isAuthenticatedSales";
import salesControl from "../controllers/sales";

const salesRoute: express.Router = express.Router();

salesRoute.post(
  "/api/owner/sales",
  isAuthenticated,
  authControl.createSalesAccount
);
salesRoute.get("/api/owner/sales", isAuthenticated, salesControl.getAllSales);
salesRoute.delete(
  "/api/owner/sales/:id",
  isAuthenticated,
  salesControl.deleteSalesAccount
);
salesRoute.post("/api/sales/login", authControl.loginSales);
salesRoute.get(
  "/api/sales/inventory/owner",
  isAuthenticatedSales,
  salesControl.getAllInventoryOwner
);

export default salesRoute;
