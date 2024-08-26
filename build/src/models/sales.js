"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shipping_1 = __importDefault(require("./shipping"));
const schemaInventorySales = new mongoose_1.default.Schema({
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
    qty_produk: {
        type: Number,
        required: true,
        default: 0,
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
        unique: true,
    },
    noHP: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
    inventory: [schemaInventorySales],
    shipping: [shipping_1.default],
}, {
    timestamps: true,
});
exports.default = salesSchema;
