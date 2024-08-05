import express from "express";
import cors from "cors";
import ownerRoute from "./routers/owner";
import errorHandling from "./middlewares/errorHandling";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use(ownerRoute);
app.use(errorHandling);

export default app;
