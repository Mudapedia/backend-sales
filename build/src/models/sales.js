"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaInventorySales = new mongoose_1.default.Schema({
    kode_produk: {
        type: String,
        required: true,
    },
    nama_produk: {
        type: String,
        required: true,
    },
    qty_produk: {
        type: String,
        required: true,
    },
});
const salesSchema = new mongoose_1.default.Schema({
    nama: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    noHP: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: null,
        },
    },
    inventory: [schemaInventorySales],
}, {
    timestamps: true,
});
exports.default = salesSchema;
