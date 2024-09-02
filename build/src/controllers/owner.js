"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const inventorySales_1 = require("../services/inventorySales");
const shipping_1 = require("../services/shipping");
const shipping_2 = __importDefault(require("../validation/shipping"));
const owner_1 = require("../services/owner");
const auth_2 = __importDefault(require("../validation/auth"));
const salt_1 = __importDefault(require("../helpers/salt"));
const encription_1 = __importDefault(require("../helpers/encription"));
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
    addInventorySales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                yield sales_1.default.addInventory(body);
                if (!(0, mongoose_1.isValidObjectId)(customReq.params.idSales)) {
                    throw new responseError_1.default("Invalid parameter", 400);
                }
                const queryAll = [];
                for (let i = 0; i < body.data.length; i++) {
                    queryAll.push(new mongoose_1.default.Types.ObjectId(body.data[i].id_produk));
                }
                const checkData = yield (0, sales_2.searchAllInventorySalesById)(customReq._id, customReq.params.idSales, queryAll);
                if (checkData.length) {
                    throw new responseError_1.default("Data ada yang duplikat", 400);
                }
                yield (0, inventorySales_1.insertManyInventorySales)(customReq._id, customReq.params.idSales, body.data);
                res
                    .status(200)
                    .json({ message: "Berhasil menambahkan produk ke inventory sales" });
            }
            catch (error) {
                next(error);
            }
        });
    },
    addShipping(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                const customReq = req;
                const body = customReq.body;
                const idSales = customReq.params.idSales;
                yield shipping_2.default.add(body);
                if (!(0, mongoose_1.isValidObjectId)(idSales)) {
                    throw new responseError_1.default("Invalid parameter", 400);
                }
                let query = [];
                let inc = {};
                for (let i = 0; i < body.list_barang.length; i++) {
                    query.push({
                        [`item${i + 1}._id`]: body.list_barang[i].id_produk,
                    });
                    inc = Object.assign(inc, {
                        [`inventory.$[item${i + 1}].qty_gudang`]: 0 - body.list_barang[i].qty_barang,
                    });
                }
                const check = yield (0, shipping_1.ShippingEditQtyServices)(customReq._id, query, inc, session);
                if (check.modifiedCount === 0) {
                    throw new responseError_1.default("Modified count 0", 400);
                }
                const checkInsert = yield (0, shipping_1.ShippingInsertServices)(customReq._id, idSales, body, session);
                if (checkInsert.matchedCount === 0) {
                    throw new responseError_1.default("Sales tidak ditemukan", 400);
                }
                yield session.commitTransaction();
                res.status(200).json({ message: "Shipping berhasil ditambahkan" });
            }
            catch (error) {
                yield session.abortTransaction();
                next(error);
            }
            finally {
                session.endSession();
            }
        });
    },
    getAllShipping(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const data = yield (0, owner_1.getAllShippingOwnerService)(customReq._id);
                res.status(200).json({ message: "Semua data shipping", data });
            }
            catch (error) {
                next(error);
            }
        });
    },
    resetPasswordSales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                const idSales = customReq.params.idSales;
                yield auth_2.default.resetPasswordSales(body);
                if (!(0, mongoose_1.isValidObjectId)(idSales)) {
                    throw new responseError_1.default("Invalid parameter", 400);
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("Invalid env");
                }
                const salt = (0, salt_1.default)();
                const hashPassword = (0, encription_1.default)(salt, body.newPassword, process.env.SECRET_KEY);
                const result = yield (0, owner_1.resetPasswordSalesServices)(customReq._id, idSales, hashPassword, salt);
                if (result.matchedCount === 0) {
                    throw new responseError_1.default("Sales tidak ditemukan", 404);
                }
                res.status(200).json({ message: "Berhasil reset password sales" });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = ownerControl;
