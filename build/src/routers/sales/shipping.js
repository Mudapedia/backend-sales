"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticatedSales_1 = __importDefault(require("../../middlewares/isAuthenticatedSales"));
const shipping_1 = __importDefault(require("../../controllers/sales/shipping"));
const salesShippingRoute = express_1.default.Router();
salesShippingRoute.get("/api/sales/shipping", isAuthenticatedSales_1.default, shipping_1.default.getAllShipping);
salesShippingRoute.put("/api/sales/shipping/:idShipping", isAuthenticatedSales_1.default, shipping_1.default.updateStatusShipping);
exports.default = salesShippingRoute;
