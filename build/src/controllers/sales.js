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
const sales_1 = require("../services/sales");
const responseError_1 = __importDefault(require("../middlewares/responseError"));
const mongoose_1 = require("mongoose");
const salesControl = {
    getAllInventoryOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ message: "Semua inventory owner", data: [] });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getAllSales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const data = yield (0, sales_1.getAllSalesService)(customReq._id);
                res.status(200).json({ data });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteSalesAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const idSales = customReq.params.id;
                if (!(0, mongoose_1.isValidObjectId)(idSales)) {
                    throw new responseError_1.default("Invalid id sales", 400);
                }
                const result = yield (0, sales_1.deleteSalesService)(customReq._id, idSales);
                if (result.modifiedCount === 0) {
                    throw new responseError_1.default("Gagal menghapus data", 400);
                }
                res.status(200).json({ message: "Akun berhasil dihapus." });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = salesControl;
