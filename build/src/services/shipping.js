"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingInsertServices = exports.ShippingEditQtyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const owner_1 = __importDefault(require("../models/owner"));
const ShippingEditQtyServices = (id, query, inc, session) => {
    return owner_1.default.updateOne({ _id: id }, {
        $inc: inc,
    }, {
        arrayFilters: query,
        session,
    });
};
exports.ShippingEditQtyServices = ShippingEditQtyServices;
const ShippingInsertServices = (id, idSales, data, session) => {
    return owner_1.default.updateOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
        "sales._id": new mongoose_1.default.Types.ObjectId(idSales),
    }, {
        $push: {
            "sales.$.shipping": data,
        },
    }, { session });
};
exports.ShippingInsertServices = ShippingInsertServices;
