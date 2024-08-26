"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BarangSchema = new mongoose_1.default.Schema({
    id_produk: {
        type: mongoose_1.default.Types.ObjectId,
    },
    kode_produk: {
        type: String,
        required: true,
    },
    nama_produk: {
        type: String,
        required: true,
    },
    qty_barang: {
        type: Number,
        required: true,
    },
});
const ShippingSchema = new mongoose_1.default.Schema({
    list_barang: [BarangSchema],
    tanggal_diterima: {
        type: Date,
    },
    status: {
        type: String,
        default: "Dikirim",
    },
}, {
    timestamps: true,
});
exports.default = ShippingSchema;
