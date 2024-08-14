import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { typeRestock } from "../types/requestBody/restock";
import { object } from "joi";

export const newRestock = (body: typeRestock, id: string) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $push: {
        history_stok: body,
      },
    }
  );
};

export const updateQtyInventory = (
  id: string,
  query: Array<object>,
  inc: any
) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $inc: inc,
    },
    {
      arrayFilters: query,
    }
  );
};

export const getAllRestock = (id: string) => {
  return OwnerCol.findById(id).select("history_stok");
};

export const getRestockById = (id: string, id_restock: string) => {
  return OwnerCol.findOne({
    _id: id,
    "history_stok._id": new mongoose.Types.ObjectId(id_restock),
  }).select("history_stok");
};

export const deleteHistoryRestock = (id: string, id_restock: string) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $pull: {
        history_stok: {
          _id: new mongoose.Types.ObjectId(id_restock),
        },
      },
    }
  );
};
