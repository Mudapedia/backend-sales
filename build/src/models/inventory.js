"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const inventorySchema = new mongoose_1.default.Schema({
    kode_produk: {
        type: String,
        required: true,
    },
    nama_produk: {
        type: String,
        required: true,
    },
    qty_gudang: {
        type: Number,
        required: true,
        default: 0,
    },
    qty_sales: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.default = inventorySchema;
