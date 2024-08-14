"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class schema {
    static get schemaRestockAdd() {
        return joi_1.default.object({
            list_produk: joi_1.default.array().items(joi_1.default.object({
                id_produk: joi_1.default.string().trim().required(),
                kode_produk: joi_1.default.string().trim().required(),
                nama_produk: joi_1.default.string().trim().required(),
                qty: joi_1.default.number().required(),
            })),
        });
    }
}
class RestockValidation extends schema {
    static add(body) {
        return this.schemaRestockAdd.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = RestockValidation;
