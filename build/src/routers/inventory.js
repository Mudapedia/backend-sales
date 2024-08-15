"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventory_1 = __importDefault(require("../controllers/inventory"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const inventoryRoute = express_1.default.Router();
inventoryRoute.post("/api/owner/inventory", isAuthenticated_1.default, inventory_1.default.add);
inventoryRoute.put("/api/owner/inventory/:id", isAuthenticated_1.default, inventory_1.default.editData);
inventoryRoute.get("/api/owner/inventory", isAuthenticated_1.default, inventory_1.default.getAllProduk);
inventoryRoute.delete("/api/owner/inventory/delete/:idProduk", isAuthenticated_1.default, inventory_1.default.deleteProduk);
exports.default = inventoryRoute;
