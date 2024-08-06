import express from "express";
import ownerControl from "../controllers/owner";
import authControl from "../controllers/auth";
import isAuthenticated from "../middlewares/isAuthenticated";

const ownerRoute: express.Router = express.Router();

ownerRoute.get("/api/owner", isAuthenticated, ownerControl.get);
ownerRoute.post("/api/owner/register", authControl.registerOwner);
ownerRoute.post("/api/owner/login", authControl.loginOwner);

export default ownerRoute;
