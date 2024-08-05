import express from "express";
import cors from "cors";
import ownerRoute from "./routers/owner";

const app: express.Application = express();

app.use(cors());
app.use(ownerRoute);

export default app;
