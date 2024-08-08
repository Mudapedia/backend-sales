"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseError_1 = __importDefault(require("./responseError"));
const joi_1 = __importDefault(require("joi"));
const errorHandling = (error, req, res, next) => {
    if (!error) {
        next();
        return;
    }
    if (error instanceof responseError_1.default) {
        res.status(error.getStatusCode).json({ errors: [error.message] });
        return;
    }
    else if (error instanceof joi_1.default.ValidationError) {
        res.status(400).json({ errors: error.message.split(".") });
        return;
    }
    res.status(500).json({ error: error.message });
};
exports.default = errorHandling;
