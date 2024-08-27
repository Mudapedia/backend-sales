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

export const searchSalesByUsernameLoginService = (username: string) => {
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
  idSales: string,
  password: string,
  salt: string,
  token: string
) => {
  return OwnerCol.updateOne(
    { "sales._id": idSales },
    {
      $set: {
        "sales.$.password": password,
        "sales.$.salt": salt,
        "sales.$.token": token,
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

export const searchSalesByIdShippingService = (id: string, idSales: string) => {
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

export const getAllSalesService = (id: string) => {
  return OwnerCol.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$sales" },
    {
      $match: { "sales.isDeleted": false },
    },
    {
      $project: {
        sales: {
          _id: 1,
          nama: 1,
          username: 1,
          noHP: 1,
          alamat: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
  ]);
};

export const deleteSalesService = (id: string, idSales: string) => {
  return OwnerCol.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
      "sales._id": idSales,
    },
    {
      $set: {
        "sales.$.isDeleted": true,
      },
    }
  );
};

export const searchAllInventorySalesById = (
  id: string,
  idSales: string,
  productIds: mongoose.Types.ObjectId[]
) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        "sales._id": new mongoose.Types.ObjectId(idSales),
      },
    },
    {
      $unwind: "$sales",
    },
    {
      $unwind: "$sales.inventory",
    },
    {
      $match: {
        "sales.inventory.id_produk": { $in: productIds },
      },
    },
    {
      $project: {
        _id: 0,
        "sales.inventory": 1,
      },
    },
  ]);
};
