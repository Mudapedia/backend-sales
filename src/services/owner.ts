import { RegisterSales } from "../types/requestBody/auth";
import OwnerCol from "../models/owner";
import mongoose from "mongoose";

export const registerSalesService = async (id: string, body: RegisterSales) => {
  return OwnerCol.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        sales: body,
      },
    }
  );
};
