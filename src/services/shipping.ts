import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { ShippingType } from "../types/requestBody/shipping";

export const ShippingEditQtyServices = (
  id: string,
  query: Array<object>,
  inc: any,
  session: mongoose.ClientSession
) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $inc: inc,
    },
    {
      arrayFilters: query,
      session,
    }
  );
};

export const ShippingInsertServices = (
  id: string,
  idSales: string,
  data: ShippingType,
  session: mongoose.ClientSession
) => {
  return OwnerCol.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
      "sales._id": new mongoose.Types.ObjectId(idSales),
    },
    {
      $push: {
        "sales.$.shipping": data,
      },
    },
    { session } // Make sure session is passed here
  );
};
