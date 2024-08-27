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
const responseError_1 = __importDefault(require("../../middlewares/responseError"));
const shipping_1 = require("../../services/sales/shipping");
const salesShippingControl = {
    getAllShipping(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CustomReq = req;
                const result = yield (0, shipping_1.salesShippingService)(CustomReq._idSales);
                if (result.length <= 0) {
                    throw new responseError_1.default("Data tidak ditemukan", 404);
                }
                res.status(200).json({
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    updateStatusShipping(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CustomReq = req;
                const result = yield (0, shipping_1.updateStatusShippingService)(CustomReq._idSales, CustomReq.params.idShipping, req.body.status);
                res.status(200).json({
                    result: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = salesShippingControl;
