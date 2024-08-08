"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseError_1 = __importDefault(require("../middlewares/responseError"));
function isDecodedJwt(decoded) {
    return (decoded &&
        typeof decoded._id === "string" &&
        typeof decoded.token === "string");
}
const jwtVerify = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
            if (err) {
                reject(new responseError_1.default("Forbidden", 403));
                return;
            }
            if (isDecodedJwt(decoded)) {
                resolve(decoded);
            }
            else {
                reject(new responseError_1.default("Invalid token structure", 400));
            }
        });
    });
};
exports.default = jwtVerify;
