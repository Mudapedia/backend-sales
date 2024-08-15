import express from "express";
import inventoryControl from "../controllers/inventory";
import isAuthenticated from "../middlewares/isAuthenticated";

const inventoryRoute: express.Router = express.Router();

inventoryRoute.post(
  "/api/owner/inventory",
  isAuthenticated,
  inventoryControl.add
);
inventoryRoute.put(
  "/api/owner/inventory/:id",
  isAuthenticated,
  inventoryControl.editData
);
inventoryRoute.get(
  "/api/owner/inventory",
  isAuthenticated,
  inventoryControl.getAllProduk
);
inventoryRoute.delete(
  "/api/owner/inventory/delete/:idProduk",
  isAuthenticated,
  inventoryControl.deleteProduk
);

export default inventoryRoute;
