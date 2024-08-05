import express from "express";
import ownerControl from "../controllers/owner";
import authControl from "../controllers/auth";

const ownerRoute: express.Router = express.Router();

ownerRoute.get("/api/owner", ownerControl.get);
ownerRoute.post("/api/owner/register", authControl.registerOwner);

export default ownerRoute;
