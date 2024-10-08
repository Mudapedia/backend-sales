"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAllInventorySalesById = exports.deleteSalesService = exports.getAllSalesService = exports.editSalesService = exports.searchSalesByIdShippingService = exports.searchSalesByIdService = exports.editPasswordAndSaltSalesService = exports.searchSalesByUsernameLoginService = exports.searchSalesByUsernameService = void 0;
const owner_1 = __importDefault(require("../models/owner"));
const mongoose_1 = __importDefault(require("mongoose"));
const searchSalesByUsernameService = (id, username) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $unwind: "$sales",
        },
        {
            $match: {
                "sales.username": username,
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                email: 1,
                sales: 1,
            },
        },
    ]);
};
exports.searchSalesByUsernameService = searchSalesByUsernameService;
const searchSalesByUsernameLoginService = (username) => {
    return owner_1.default.aggregate([
        {
            $unwind: "$sales",
        },
        {
            $match: {
                "sales.username": username,
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                email: 1,
                sales: 1,
            },
        },
    ]);
};
exports.searchSalesByUsernameLoginService = searchSalesByUsernameLoginService;
const editPasswordAndSaltSalesService = (idSales, password, salt, token) => {
    return owner_1.default.updateOne({ "sales._id": idSales }, {
        $set: {
            "sales.$.password": password,
            "sales.$.salt": salt,
            "sales.$.token": token,
        },
    });
};
exports.editPasswordAndSaltSalesService = editPasswordAndSaltSalesService;
const searchSalesByIdService = (id, idSales) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $unwind: "$sales",
        },
        {
            $match: {
                "sales._id": new mongoose_1.default.Types.ObjectId(idSales),
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                email: 1,
                sales: 1,
            },
        },
    ]);
};
exports.searchSalesByIdService = searchSalesByIdService;
const searchSalesByIdShippingService = (id, idSales) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $unwind: "$sales",
        },
        {
            $match: {
                "sales._id": new mongoose_1.default.Types.ObjectId(idSales),
            },
        },
        {
            $project: {
                _id: 1,
                sales: 1,
            },
        },
    ]);
};
exports.searchSalesByIdShippingService = searchSalesByIdShippingService;
const editSalesService = (id, idSales, body) => {
    return owner_1.default.updateOne({ _id: id, "sales._id": idSales }, {
        $set: {
            "sales.$.nama": body.nama,
            "sales.$.username": body.username,
            "sales.$.noHP": body.noHP,
            "sales.$.alamat": body.alamat,
        },
    });
};
exports.editSalesService = editSalesService;
const getAllSalesService = (id) => {
    return owner_1.default.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
        { $unwind: "$sales" },
        {
            $match: { "sales.isDeleted": false },
        },
        {
            $project: {
                sales: {
                    _id: 1,
                    nama: 1,
                    username: 1,
                    noHP: 1,
                    alamat: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        },
    ]);
};
exports.getAllSalesService = getAllSalesService;
const deleteSalesService = (id, idSales) => {
    return owner_1.default.updateOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
        "sales._id": idSales,
    }, {
        $set: {
            "sales.$.isDeleted": true,
        },
    });
};
exports.deleteSalesService = deleteSalesService;
const searchAllInventorySalesById = (id, idSales, productIds) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
                "sales._id": new mongoose_1.default.Types.ObjectId(idSales),
            },
        },
        {
            $unwind: "$sales",
        },
        {
            $unwind: "$sales.inventory",
        },
        {
            $match: {
                "sales.inventory.id_produk": { $in: productIds },
            },
        },
        {
            $project: {
                _id: 0,
                "sales.inventory": 1,
            },
        },
    ]);
};
exports.searchAllInventorySalesById = searchAllInventorySalesById;
