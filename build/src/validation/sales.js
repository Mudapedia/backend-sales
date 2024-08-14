"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
class Schema {
    static get schemaRegisterSales() {
        return joi_1.default.object({
            nama: joi_1.default.string().trim().required(),
            username: joi_1.default.string().trim().required(),
            noHP: joi_1.default.string().trim().required(),
            alamat: joi_1.default.string().trim().required(),
            password: joi_1.default.string().trim().min(8).required(),
        });
    }
    static get schemaLoginSales() {
        return joi_1.default.object({
            username: joi_1.default.string().trim().required(),
            password: joi_1.default.string().trim().required(),
        });
    }
    static get schemaEditSales() {
        return joi_1.default.object({
            nama: joi_1.default.string().trim().required(),
            username: joi_1.default.string().trim().required(),
            noHP: joi_1.default.string().trim().required(),
            alamat: joi_1.default.string().trim().required(),
        });
    }
    static get schemaAddInventorySales() {
        return joi_1.default.object({
            data: joi_1.default.array()
                .items(joi_1.default.object({
                _id: joi_1.default.string()
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
                qty_produk: joi_1.default.number().min(1).required(),
            }))
                .min(1)
                .required(),
        });
    }
}
class SalesValidation extends Schema {
    static register(body) {
        return this.schemaRegisterSales.validateAsync(body, {
            abortEarly: false,
        });
    }
    static login(body) {
        return this.schemaLoginSales.validateAsync(body, {
            abortEarly: false,
        });
    }
    static edit(body) {
        return this.schemaEditSales.validateAsync(body, {
            abortEarly: false,
        });
    }
    static addInventory(body) {
        return this.schemaAddInventorySales.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = SalesValidation;
