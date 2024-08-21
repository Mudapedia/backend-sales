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
const auth_1 = require("../services/auth");
const responseError_1 = __importDefault(require("../middlewares/responseError"));
const sales_1 = __importDefault(require("../validation/sales"));
const sales_2 = require("../services/sales");
const mongoose_1 = require("mongoose");
const ownerControl = {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const user = yield (0, auth_1.getDetailById)(customReq._id);
                if (!user) {
                    throw new responseError_1.default("User tidak ditemukan.", 400);
                }
                return res.status(200).json(user).end();
            }
            catch (error) {
                next(error);
            }
        });
    },
    editSales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                const idSales = customReq.params.id;
                if (!(0, mongoose_1.isValidObjectId)(idSales)) {
                    throw new responseError_1.default("Invalid paramter", 400);
                }
                yield sales_1.default.edit(body);
                const check = yield (0, sales_2.searchSalesByIdService)(customReq._id, idSales);
                if (!check.length) {
                    throw new responseError_1.default("Sales not found", 404);
                }
                if (check[0].sales.username !== body.username) {
                    const checkUsername = yield (0, sales_2.searchSalesByUsernameService)(customReq._id, body.username);
                    if (checkUsername.length) {
                        throw new responseError_1.default("Username udah ada", 400);
                    }
                }
                yield (0, sales_2.editSalesService)(customReq._id, idSales, body);
                res.status(200).json({ message: "Berhasil edit sales" });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = ownerControl;
