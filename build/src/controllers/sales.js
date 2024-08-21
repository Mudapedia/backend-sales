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
Object.defineProperty(exports, "__esModule", { value: true });
const sales_1 = require("../services/sales");
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
};
exports.default = salesControl;
