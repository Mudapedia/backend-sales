import express from "express";
import inventoryControl from "../controllers/inventory";
import isAuthenticated from "../middlewares/isAuthenticated";

const inventoryRoute: express.Router = express.Router();

// inventoryRoute.get("/api/owner/inventory");
inventoryRoute.post(
  "/api/owner/inventory",
  isAuthenticated,
  inventoryControl.add
);
inventoryRoute.put(
  "/api/owner/inventory/:id",
  isAuthenticated,
  inventoryControl.edit
);
// inventoryRoute.delete("/api/owner/inventory/:id");

export default inventoryRoute;
