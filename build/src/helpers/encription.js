"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const encription = (salt, password, secret) => {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(secret)
        .digest("hex");
};
exports.default = encription;
