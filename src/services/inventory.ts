import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { InventoryAdd, InventoryEdit } from "../types/requestBody/inventory";
import { DataSales } from "../types/requestBody/sales";

export const getProductsByOwner = (id: string) => {
  return OwnerCol.findById(id).select("inventory");
};

export const deleteProductByIdProduct = (id: string, id_produk: string) => {
  return OwnerCol.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    {
      $pull: {
        inventory: {
          _id: new mongoose.Types.ObjectId(id_produk),
        },
      },
    }
  );
};

export const addInventoryService = (body: InventoryAdd, id: string) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $push: {
        inventory: body,
      },
    }
  );
};

export const editInventoryService = (
  body: InventoryEdit,
  id: string,
  idInventory: string
) => {
  return OwnerCol.updateOne(
    { _id: id, "inventory._id": idInventory },
    {
      $set: {
        "inventory.$.nama_produk": body.nama_produk,
        "inventory.$.qty_gudang": body.qty_gudang,
        "inventory.$.qty_sales": body.qty_sales,
      },
    }
  );
};

export const getByKodeProdukInventory = (id: string, kodeProduk: string) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $unwind: "$inventory",
    },
    {
      $match: {
        "inventory.kode_produk": kodeProduk,
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        inventory: 1,
      },
    },
  ]);
};

export const getByIdInventory = (id: string, idInventory: string) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $unwind: "$inventory",
    },
    {
      $match: {
        "inventory._id": new mongoose.Types.ObjectId(idInventory),
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        inventory: 1,
      },
    },
  ]);
};

export const getManyInventory = (
  id: string,
  query: mongoose.Types.ObjectId[]
) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $unwind: "$inventory",
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
        "inventory._id": {
          $in: query,
        },
      },
    },
  ]);
};
