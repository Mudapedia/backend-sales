import express from "express";
import cors from "cors";
import ownerRoute from "./routers/owner";
import errorHandling from "./middlewares/errorHandling";
import inventoryRoute from "./routers/inventory";
import salesRoute from "./routers/sales";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use(ownerRoute);
app.use(salesRoute);
app.use(inventoryRoute);
app.use(errorHandling);

export default app;
