"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesByUsername = exports.addSalesAccount = exports.getDetailById = exports.getByIdSales = exports.getById = exports.getByToken = exports.getByEmail = exports.registerOwner = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const owner_1 = __importDefault(require("../models/owner"));
const registerOwner = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const insert = new owner_1.default({
        username: body.username,
        email: body.email,
        authentication: {
            password: body.password,
            salt: body.salt,
        },
    });
    yield insert.save();
});
exports.registerOwner = registerOwner;
const getByEmail = (email) => {
    return owner_1.default.findOne({ email: email });
};
exports.getByEmail = getByEmail;
const getByToken = (token) => {
    return owner_1.default.findOne({ "authentication.token": token });
};
exports.getByToken = getByToken;
const getById = (id) => {
    return owner_1.default.findOne({ _id: id });
};
exports.getById = getById;
const getByIdSales = (id) => {
    return owner_1.default.aggregate([
        {
            $unwind: "$sales",
        },
        {
            $match: {
                "sales._id": new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $project: {
                email: 0,
                authentication: 0,
                inventory: 0,
                history_stok: 0,
                "sales.password": 0,
                "sales.inventory": 0,
                "sales.shipping": 0,
            },
        },
    ]);
};
exports.getByIdSales = getByIdSales;
const getDetailById = (id) => {
    return owner_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                email: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ]);
};
exports.getDetailById = getDetailById;
const addSalesAccount = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    return owner_1.default.updateOne({ _id: id }, {
        $push: {
            sales: body,
        },
    });
});
exports.addSalesAccount = addSalesAccount;
const getSalesByUsername = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
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
                _id: "$sales._id",
                username: "$sales.username",
                nama: "$sales.nama",
                noHP: "$sales.noHP",
                alamat: "$sales.alamat",
            },
        },
    ]);
});
exports.getSalesByUsername = getSalesByUsername;
