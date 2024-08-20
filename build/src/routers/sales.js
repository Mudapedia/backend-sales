"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const auth_1 = __importDefault(require("../controllers/auth"));
const isAuthenticatedSales_1 = __importDefault(require("../middlewares/isAuthenticatedSales"));
const sales_1 = __importDefault(require("../controllers/sales"));
const salesRoute = express_1.default.Router();
salesRoute.post("/api/sales/login", auth_1.default.loginSales);
salesRoute.post("/api/owner/sales", isAuthenticated_1.default, auth_1.default.createSalesAccount);
salesRoute.get("/api/sales/inventory/owner", isAuthenticatedSales_1.default, sales_1.default.getAllInventoryOwner);
exports.default = salesRoute;
