"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSalesService = exports.searchSalesByIdService = exports.editPasswordAndSaltSalesService = exports.searchSalesByUsernameLoginService = exports.searchSalesByUsernameService = void 0;
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
const searchSalesByUsernameLoginService = (id, username) => {
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
const editPasswordAndSaltSalesService = (id, idSales, password, salt) => {
    return owner_1.default.updateOne({ _id: id, "sales._id": idSales }, {
        $set: {
            "sales.$.password": password,
            "sales.$.salt": salt,
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
