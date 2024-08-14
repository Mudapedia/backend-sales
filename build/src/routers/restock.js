"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const restock_1 = __importDefault(require("../controllers/restock"));
const restockRoute = express_1.default.Router();
restockRoute.post("/api/owner/restock", isAuthenticated_1.default, restock_1.default.add);
restockRoute.get("/api/owner/restock", isAuthenticated_1.default, restock_1.default.get);
restockRoute.delete("/api/owner/restock/:idStock", isAuthenticated_1.default, restock_1.default.delete);
exports.default = restockRoute;
