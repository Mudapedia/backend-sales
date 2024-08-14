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
const restock_1 = __importDefault(require("../validation/restock"));
const restok_1 = require("../services/restok");
const responseError_1 = __importDefault(require("../middlewares/responseError"));
const ulid_1 = require("ulid");
const restockControl = {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                yield restock_1.default.add(body);
                const kode = (0, ulid_1.ulid)();
                const new_body = Object.assign(body, {
                    ["kode_restock"]: kode,
                });
                const result = yield (0, restok_1.newRestock)(new_body, customReq._id);
                if (result.modifiedCount === 0) {
                    throw new responseError_1.default("Gagal menambahkan data stok ke server", 400);
                }
                let query = [];
                let inc = {};
                for (let i = 0; i < body.list_produk.length; i++) {
                    query.push({
                        [`item${i + 1}._id`]: body.list_produk[i].id_produk,
                    });
                    inc = Object.assign(inc, {
                        [`inventory.$[item${i + 1}].qty_gudang`]: body.list_produk[i].qty,
                    });
                }
                const resultUpdate = yield (0, restok_1.updateQtyInventory)(customReq._id, query, inc);
                if (resultUpdate.modifiedCount === 0) {
                    throw new responseError_1.default("Gagal menambahkan jumlah stok ke server", 400);
                }
                return res.status(200).json({
                    message: "Data berhasil ditambahkan.",
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const result = yield (0, restok_1.getAllRestock)(customReq._id);
                if (!result) {
                    throw new responseError_1.default("Data tidak ditemukan", 400);
                }
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const dataRestock = yield (0, restok_1.getRestockById)(customReq._id, customReq.params.idStock);
                if (!dataRestock) {
                    throw new responseError_1.default("Data tidak ditemukan", 400);
                }
                let query = [];
                let inc = {};
                const historyStock = dataRestock.history_stok;
                for (let i = 0; i < historyStock[0].list_produk.length; i++) {
                    query.push({
                        [`item${i + 1}._id`]: historyStock[0].list_produk[i].id_produk,
                    });
                    inc = Object.assign(inc, {
                        [`inventory.$[item${i + 1}].qty_gudang`]: 0 - historyStock[0].list_produk[i].qty,
                    });
                }
                const resultUpdate = yield (0, restok_1.updateQtyInventory)(customReq._id, query, inc);
                if (resultUpdate.modifiedCount === 0) {
                    throw new responseError_1.default("Gagal Mengurangi Nominal Gudang", 400);
                }
                const result = yield (0, restok_1.deleteHistoryRestock)(customReq._id, customReq.params.idStock);
                if (result.modifiedCount === 0) {
                    throw new responseError_1.default("Gagal menghapus data restock.", 400);
                }
                return res
                    .status(200)
                    .json({ message: "Berhasil menghapus data restock" });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = restockControl;
