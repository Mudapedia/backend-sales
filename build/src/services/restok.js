"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistoryRestock = exports.getRestockById = exports.getAllRestock = exports.updateQtyInventory = exports.newRestock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const owner_1 = __importDefault(require("../models/owner"));
const newRestock = (body, id) => {
    return owner_1.default.updateOne({ _id: id }, {
        $push: {
            history_stok: body,
        },
    });
};
exports.newRestock = newRestock;
const updateQtyInventory = (id, query, inc) => {
    return owner_1.default.updateOne({ _id: id }, {
        $inc: inc,
    }, {
        arrayFilters: query,
    });
};
exports.updateQtyInventory = updateQtyInventory;
const getAllRestock = (id) => {
    return owner_1.default.findById(id).select("history_stok");
};
exports.getAllRestock = getAllRestock;
const getRestockById = (id, id_restock) => {
    return owner_1.default.findOne({
        _id: id,
        "history_stok._id": new mongoose_1.default.Types.ObjectId(id_restock),
    }).select("history_stok");
};
exports.getRestockById = getRestockById;
const deleteHistoryRestock = (id, id_restock) => {
    return owner_1.default.updateOne({ _id: id }, {
        $pull: {
            history_stok: {
                _id: new mongoose_1.default.Types.ObjectId(id_restock),
            },
        },
    });
};
exports.deleteHistoryRestock = deleteHistoryRestock;
