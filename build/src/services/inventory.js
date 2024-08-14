"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyInventory = exports.getByIdInventory = exports.getByKodeProdukInventory = exports.editInventoryService = exports.addInventoryService = exports.deleteProductByIdProduct = exports.getProductsByOwner = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const owner_1 = __importDefault(require("../models/owner"));
const getProductsByOwner = (id) => {
    return owner_1.default.findById(id).select("inventory");
};
exports.getProductsByOwner = getProductsByOwner;
const deleteProductByIdProduct = (id, id_produk) => {
    return owner_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, {
        $pull: {
            inventory: {
                _id: new mongoose_1.default.Types.ObjectId(id_produk),
            },
        },
    });
};
exports.deleteProductByIdProduct = deleteProductByIdProduct;
const addInventoryService = (body, id) => {
    return owner_1.default.updateOne({ _id: id }, {
        $push: {
            inventory: body,
        },
    });
};
exports.addInventoryService = addInventoryService;
const editInventoryService = (body, id, idInventory) => {
    return owner_1.default.updateOne({ _id: id, "inventory._id": idInventory }, {
        $set: {
            "inventory.$.nama_produk": body.nama_produk,
            "inventory.$.qty_gudang": body.qty_gudang,
            "inventory.$.qty_sales": body.qty_sales,
        },
    });
};
exports.editInventoryService = editInventoryService;
const getByKodeProdukInventory = (id, kodeProduk) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $unwind: "$inventory",
        },
        {
            $match: {
                "inventory.kode_produk": kodeProduk,
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                inventory: 1,
            },
        },
    ]);
};
exports.getByKodeProdukInventory = getByKodeProdukInventory;
const getByIdInventory = (id, idInventory) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $unwind: "$inventory",
        },
        {
            $match: {
                "inventory._id": new mongoose_1.default.Types.ObjectId(idInventory),
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                inventory: 1,
            },
        },
    ]);
};
exports.getByIdInventory = getByIdInventory;
const getManyInventory = (id, query) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $unwind: "$inventory",
        },
        {
            $project: {
                _id: 1,
                username: 1,
                inventory: 1,
            },
        },
        {
            $match: {
                "inventory._id": {
                    $in: query,
                },
            },
        },
    ]);
};
exports.getManyInventory = getManyInventory;
