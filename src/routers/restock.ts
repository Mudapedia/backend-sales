import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import restockControl from "../controllers/restock";

const restockRoute: express.Router = express.Router();

restockRoute.post("/api/owner/restock", isAuthenticated, restockControl.add);

export default restockRoute;
