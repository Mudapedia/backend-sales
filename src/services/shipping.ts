import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { ShippingType } from "../types/requestBody/shipping";

export const ShippingEditQtyServices = (
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

export const ShippingInsertServices = (id: string, data: ShippingType) => {
  return OwnerCol.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    {
      $push: {
        shipping: data,
      },
    }
  );
};
