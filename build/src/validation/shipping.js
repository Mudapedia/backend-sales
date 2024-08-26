"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
class schema {
    static get schemaAddShipping() {
        return joi_1.default.object({
            list_barang: joi_1.default.array()
                .min(1)
                .items(joi_1.default.object({
                id_produk: joi_1.default.string()
                    .trim()
                    .required()
                    .custom((value, helpers) => {
                    if (!(0, mongoose_1.isValidObjectId)(value)) {
                        return helpers.error("id.invalid");
                    }
                })
                    .messages({
                    "id.invalid": "Id invalid",
                }),
                kode_produk: joi_1.default.string().trim().required(),
                nama_produk: joi_1.default.string().trim().required(),
                qty_barang: joi_1.default.number().required(),
            }).required()),
        });
    }
}
class ShippingValidation extends schema {
    static add(body) {
        return this.schemaAddShipping.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = ShippingValidation;
