"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Schema {
    static get schemaInventoryAdd() {
        return joi_1.default.object({
            kode_produk: joi_1.default.string().trim().required(),
            nama_produk: joi_1.default.string().trim().required(),
            qty_gudang: joi_1.default.number(),
            qty_sales: joi_1.default.number(),
        });
    }
    static get schemaInventoryEdit() {
        return joi_1.default.object({
            nama_produk: joi_1.default.string().trim().required(),
            qty_gudang: joi_1.default.number().required(),
            qty_sales: joi_1.default.number().required(),
        });
    }
}
class InventoryValidation extends Schema {
    static add(body) {
        return this.schemaInventoryAdd.validateAsync(body, {
            abortEarly: false,
        });
    }
    static edit(body) {
        return this.schemaInventoryEdit.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = InventoryValidation;
