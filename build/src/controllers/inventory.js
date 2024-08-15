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
const inventory_1 = __importDefault(require("../validation/inventory"));
const inventory_2 = require("../services/inventory");
const mongoose_1 = require("mongoose");
const responseError_1 = __importDefault(require("../middlewares/responseError"));
const inventoryControl = {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                yield inventory_1.default.add(body);
                const kodeProduk = yield (0, inventory_2.getByKodeProdukInventory)(customReq._id, body.kode_produk);
                if (kodeProduk.length) {
                    throw new responseError_1.default("Kode produk sudah ada", 400);
                }
                yield (0, inventory_2.addInventoryService)(body, customReq._id);
                res.status(201).json({ message: "Berhasil menambahkan inventory" });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getAllProduk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const allProduk = yield (0, inventory_2.getProductsByOwner)(customReq._id);
                if (!allProduk) {
                    throw new responseError_1.default("Data Tidak ditemukan ", 400);
                }
                return res.status(200).json(allProduk).end();
            }
            catch (error) {
                return res.status(400).json({ message: error });
            }
        });
    },
    editData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                if (!(0, mongoose_1.isValidObjectId)(customReq.params.id)) {
                    throw new responseError_1.default("Invalid parameter", 400);
                }
                const body = customReq.body;
                yield inventory_1.default.edit(body);
                const result = yield (0, inventory_2.editDataBarang)(body, customReq._id, customReq.params.id);
                if (result.modifiedCount === 0) {
                    throw new responseError_1.default("Inventory not found", 404);
                }
                res.status(200).json({ message: "Berhasil mengubah inventory" });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteProduk(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const idProduk = customReq.params.idProduk;
                if (!(0, mongoose_1.isValidObjectId)(idProduk)) {
                    throw new responseError_1.default("invalid parameter", 400);
                }
                const result = yield (0, inventory_2.deleteProductByIdProduct)(customReq._id, idProduk);
                if (result.modifiedCount > 0) {
                    return res.status(200).json({ message: "Produk berhasil dihapus" });
                }
                else {
                    throw new responseError_1.default("Produk tidak ditemukan", 400);
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = inventoryControl;
