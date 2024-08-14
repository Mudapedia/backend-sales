import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import restockControl from "../controllers/restock";

const restockRoute: express.Router = express.Router();

restockRoute.post("/api/owner/restock", isAuthenticated, restockControl.add);
restockRoute.get("/api/owner/restock", isAuthenticated, restockControl.get);
restockRoute.delete(
  "/api/owner/restock/:idStock",
  isAuthenticated,
  restockControl.delete
);

export default restockRoute;
