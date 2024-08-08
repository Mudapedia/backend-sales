import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import authControl from "../controllers/auth";

const salesRoute: express.Router = express.Router();

salesRoute.post("/api/sales/login", isAuthenticated, authControl.loginSales);

export default salesRoute;
