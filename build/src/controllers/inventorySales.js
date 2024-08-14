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
const sales_1 = __importDefault(require("../validation/sales"));
const inventory_1 = require("../services/inventory");
const mongoose_1 = __importDefault(require("mongoose"));
const responseError_1 = __importDefault(require("../middlewares/responseError"));
const inventorySales_1 = require("../services/inventorySales");
const inventorySales = {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                yield sales_1.default.addInventory(body);
                let query = [];
                for (let i = 0; i < body.data.length; i++) {
                    query.push(new mongoose_1.default.Types.ObjectId(body.data[i]._id));
                }
                const check = yield (0, inventory_1.getManyInventory)(customReq._id, query);
                if (body.data.length !== check.length) {
                    throw new responseError_1.default("Periksa data body anda", 400);
                }
                const checkInventorySales = yield (0, inventorySales_1.getManyInventorySales)(customReq._id, query);
                if (!checkInventorySales.length) {
                    const dataInsertmany = [];
                    for (let i = 0; i < check.length; i++) {
                        dataInsertmany.push({
                            kode_produk: check[i].inventory.kode_produk,
                            nama_produk: check[i].inventory.nama_produk,
                            qty_produk: body.data[i].qty_produk,
                        });
                    }
                    yield (0, inventorySales_1.insertManyInventorySales)(customReq._id, dataInsertmany);
                }
                res
                    .status(200)
                    .json({ message: "Berhasil menambahkan produk ke inventory sales" });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = inventorySales;
