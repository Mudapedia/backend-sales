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
exports.resetPasswordSalesServices = exports.resetPasswordOwnerServices = exports.addOTPOwner = exports.getOwnerByEmail = exports.getAllShippingOwnerService = exports.registerSalesService = void 0;
const owner_1 = __importDefault(require("../models/owner"));
const mongoose_1 = __importDefault(require("mongoose"));
const registerSalesService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    return owner_1.default.updateOne({
        _id: id,
    }, {
        $push: {
            sales: {
                nama: body.nama,
                username: body.username,
                noHP: body.noHP,
                alamat: body.alamat,
                authentication: {
                    password: body.password,
                    salt: body.salt,
                },
            },
        },
    });
});
exports.registerSalesService = registerSalesService;
const getAllShippingOwnerService = (id) => {
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
            $unwind: "$sales.shipping",
        },
        {
            $project: {
                email: 0,
                authentication: 0,
                history_stok: 0,
                inventory: 0,
                createdAt: 0,
                updatedAt: 0,
                username: 0,
                "sales.password": 0,
                "sales.salt": 0,
                "sales.token": 0,
                "sales.inventory": 0,
                "sales.createdAt": 0,
                "sales.updatedAt": 0,
                "sales.noHP": 0,
                "sales.isDeleted": 0,
                "sales.alamat": 0,
            },
        },
    ]);
};
exports.getAllShippingOwnerService = getAllShippingOwnerService;
const getOwnerByEmail = (email) => {
    return owner_1.default.findOne({ email: email });
};
exports.getOwnerByEmail = getOwnerByEmail;
const addOTPOwner = (email, otp, session) => {
    return owner_1.default.updateOne({ email: email }, {
        $set: {
            "authentication.otp": otp,
        },
    }, {
        session: session,
    });
};
exports.addOTPOwner = addOTPOwner;
const resetPasswordOwnerServices = (id, newPassword, salt) => {
    return owner_1.default.updateOne({ _id: id }, {
        $set: {
            "authentication.password": newPassword,
            "authentication.salt": salt,
            "authentication.otp": null,
        },
    });
};
exports.resetPasswordOwnerServices = resetPasswordOwnerServices;
const resetPasswordSalesServices = (id, idSales, newPassword, salt) => {
    return owner_1.default.updateOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
        "sales._id": new mongoose_1.default.Types.ObjectId(idSales),
    }, {
        $set: {
            "sales.$.password": newPassword,
            "sales.$.salt": salt,
            "sales.$.token": null,
        },
    });
};
exports.resetPasswordSalesServices = resetPasswordSalesServices;
