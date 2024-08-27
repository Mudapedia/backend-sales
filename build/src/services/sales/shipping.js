"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusShippingService = exports.salesShippingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const owner_1 = __importDefault(require("../../models/owner"));
const salesShippingService = (id) => {
    return owner_1.default.aggregate([
        { $unwind: "$sales" },
        { $match: { "sales._id": new mongoose_1.default.Types.ObjectId(id) } },
        { $project: { _id: 0, shipping: "$sales.shipping" } },
    ]);
};
exports.salesShippingService = salesShippingService;
const updateStatusShippingService = (id, idShipping, status) => {
    return owner_1.default.updateOne({
        "sales._id": new mongoose_1.default.Types.ObjectId(id),
        "sales.shipping._id": new mongoose_1.default.Types.ObjectId(idShipping),
    }, {
        $set: { "sales.$[outer].shipping.$[inner].status": status },
    }, {
        arrayFilters: [
            { "outer._id": new mongoose_1.default.Types.ObjectId(id) },
            { "inner._id": new mongoose_1.default.Types.ObjectId(idShipping) },
        ],
    });
};
exports.updateStatusShippingService = updateStatusShippingService;
