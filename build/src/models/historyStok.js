"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const listProduk = new mongoose_1.default.Schema({
    id_produk: {
        type: String,
        required: true,
    },
    kode_produk: {
        type: String,
        required: true,
    },
    nama_produk: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        default: 0,
    },
});
const historyStok = new mongoose_1.default.Schema({
    kode_restock: {
        type: String,
        required: true,
    },
    list_produk: [listProduk],
}, {
    timestamps: true,
});
exports.default = historyStok;
