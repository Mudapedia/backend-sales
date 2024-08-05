import express from "express";
import ownerControl from "../controllers/owner";

const ownerRoute: express.Router = express.Router();

ownerRoute.get("/api/owner", ownerControl.get);

export default ownerRoute;
