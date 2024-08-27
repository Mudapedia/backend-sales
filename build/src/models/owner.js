"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sales_1 = __importDefault(require("./sales"));
const inventory_1 = __importDefault(require("./inventory"));
const historyStok_1 = __importDefault(require("./historyStok"));
const schemaOwner = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            select: false,
            required: true,
        },
        salt: {
            type: String,
            select: false,
            required: true,
        },
        token: {
            type: String,
            select: false,
        },
        otp: {
            type: String,
        },
    },
    sales: [sales_1.default],
    inventory: [inventory_1.default],
    history_stok: [historyStok_1.default],
}, {
    timestamps: true,
});
const OwnerCol = mongoose_1.default.model("owner", schemaOwner, "owner");
exports.default = OwnerCol;
