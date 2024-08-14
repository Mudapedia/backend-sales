"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertManyInventorySales = exports.getManyInventorySales = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const owner_1 = __importDefault(require("../models/owner"));
const getManyInventorySales = (id, query) => {
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
            $project: {
                _id: 1,
                username: 1,
                inventory: 1,
            },
        },
        {
            $match: {
                "sales._id": {
                    $in: query,
                },
            },
        },
    ]);
};
exports.getManyInventorySales = getManyInventorySales;
const insertManyInventorySales = (id, data) => {
    return owner_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, {
        $push: {
            "sales.inventory": {
                $each: data,
            },
        },
    });
};
exports.insertManyInventorySales = insertManyInventorySales;
