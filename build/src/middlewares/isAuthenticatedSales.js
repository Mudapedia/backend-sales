"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseError_1 = __importDefault(require("./responseError"));
const auth_1 = require("../services/auth");
const mongoose_1 = require("mongoose");
const jwtVerify_1 = __importDefault(require("../helpers/jwtVerify"));
const isAuthenticatedSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req;
        const ReqToken = customReq.headers.authorization;
        if (!ReqToken) {
            throw new responseError_1.default("Forbidden", 403);
        }
        const [schema, token] = ReqToken.split(" ");
        if (schema !== "Bearer") {
            throw new responseError_1.default("Forbidden", 403);
        }
        if (!process.env.SECRET_KEY) {
            throw new Error("Invalid env");
        }
        const decoded = yield (0, jwtVerify_1.default)(token, process.env.SECRET_KEY);
        if (!(0, mongoose_1.isValidObjectId)(decoded._id)) {
            throw new responseError_1.default("Forbidden", 403);
        }
        const user = yield (0, auth_1.getByIdSales)(decoded._id);
        if (!user.length) {
            throw new responseError_1.default("Forbidden", 403);
        }
        if (decoded.token !== user[0].sales.token) {
            throw new responseError_1.default("Forbidden", 403);
        }
        customReq._idSales = decoded._id;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = isAuthenticatedSales;
