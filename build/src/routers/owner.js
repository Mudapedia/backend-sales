"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const owner_1 = __importDefault(require("../controllers/owner"));
const auth_1 = __importDefault(require("../controllers/auth"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const ownerRoute = express_1.default.Router();
ownerRoute.get("/api/owner", isAuthenticated_1.default, owner_1.default.get);
ownerRoute.post("/api/owner/register", auth_1.default.registerOwner);
ownerRoute.post("/api/owner/login", auth_1.default.loginOwner);
ownerRoute.put("/api/owner/sales/:id", isAuthenticated_1.default, owner_1.default.editSales);
ownerRoute.post("/api/owner/sales/inventory/:idSales", isAuthenticated_1.default, owner_1.default.addInventorySales);
ownerRoute.post("/api/owner/shipping/sales/:idSales", isAuthenticated_1.default, owner_1.default.addShipping);
ownerRoute.get("/api/owner/shipping", isAuthenticated_1.default, owner_1.default.getAllShipping);
exports.default = ownerRoute;
