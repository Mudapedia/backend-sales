import OwnerCol from "../models/owner";
import mongoose from "mongoose";

export const searchSalesByUsernameService = (id: string, username: string) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $unwind: "$sales",
    },
    {
      $match: {
        "sales.username": username,
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        sales: 1,
      },
    },
  ]);
};

export const editPasswordAndSaltSalesService = (
  id: string,
  idSales: string,
  password: string,
  salt: string
) => {
  return OwnerCol.updateOne(
    { _id: id, "sales._id": idSales },
    {
      $set: {
        "sales.$.password": password,
        "sales.$.salt": salt,
      },
    }
  );
};
