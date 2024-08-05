"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const owner_1 = __importDefault(require("../controllers/owner"));
const ownerRoute = express_1.default.Router();
ownerRoute.get("/api/owner", owner_1.default.get);
exports.default = ownerRoute;
