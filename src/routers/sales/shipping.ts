import express from "express";
import isAuthenticatedSales from "../../middlewares/isAuthenticatedSales";
import salesShippingControl from "../../controllers/sales/shipping";

const salesShippingRoute: express.Router = express.Router();

salesShippingRoute.get(
  "/api/sales/shipping",
  isAuthenticatedSales,
  salesShippingControl.getAllShipping
);
salesShippingRoute.put(
  "/api/sales/shipping/:idShipping",
  isAuthenticatedSales,
  salesShippingControl.updateStatusShipping
);

export default salesShippingRoute;
