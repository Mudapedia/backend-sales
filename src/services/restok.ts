import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { typeRestock } from "../types/requestBody/restock";

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
