import OwnerCol from "../models/owner";
import mongoose from "mongoose";
import { EditSales } from "../types/requestBody/owner";

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

export const searchSalesByUsernameLoginService = (
  id: string,
  username: string
) => {
  return OwnerCol.aggregate([
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

export const searchSalesByIdService = (id: string, idSales: string) => {
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
        "sales._id": new mongoose.Types.ObjectId(idSales),
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

export const editSalesService = (
  id: string,
  idSales: string,
  body: EditSales
) => {
  return OwnerCol.updateOne(
    { _id: id, "sales._id": idSales },
    {
      $set: {
        "sales.$.nama": body.nama,
        "sales.$.username": body.username,
        "sales.$.noHP": body.noHP,
        "sales.$.alamat": body.alamat,
      },
    }
  );
};
