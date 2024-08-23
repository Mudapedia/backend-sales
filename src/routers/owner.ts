import express from "express";
import ownerControl from "../controllers/owner";
import authControl from "../controllers/auth";
import isAuthenticated from "../middlewares/isAuthenticated";

const ownerRoute: express.Router = express.Router();

ownerRoute.get("/api/owner", isAuthenticated, ownerControl.get);
ownerRoute.post("/api/owner/register", authControl.registerOwner);
ownerRoute.post("/api/owner/login", authControl.loginOwner);
ownerRoute.put("/api/owner/sales/:id", isAuthenticated, ownerControl.editSales);

// inventory sales
ownerRoute.post(
  "/api/owner/sales/inventory/:idSales",
  isAuthenticated,
  ownerControl.addInventorySales
);
ownerRoute.post(
  "/api/owner/shipping/sales/:idSales",
  isAuthenticated,
  ownerControl.addShipping
);

export default ownerRoute;
