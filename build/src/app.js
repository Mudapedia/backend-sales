"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const owner_1 = __importDefault(require("./routers/owner"));
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const inventory_1 = __importDefault(require("./routers/inventory"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(owner_1.default);
app.use(inventory_1.default);
app.use(errorHandling_1.default);
exports.default = app;
