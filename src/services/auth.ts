import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { RegisterOwner, RegisterSales } from "../types/requestBody/auth";

export const registerOwner = async (body: RegisterOwner) => {
  const insert = new OwnerCol({
    username: body.username,
    email: body.email,
    authentication: {
      password: body.password,
      salt: body.salt,
    },
  });
  await insert.save();
};

export const getByEmail = (email: string) => {
  return OwnerCol.findOne({ email: email });
};

export const getByToken = (token: string) => {
  return OwnerCol.findOne({ "authentication.token": token });
};

export const getById = (id: string) => {
  return OwnerCol.findOne({ _id: id });
};

export const getByIdSales = (id: string) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
  ]);
};

export const getDetailById = (id: string) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
};

export const addSalesAccount = async (body: RegisterSales, id: string) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $push: {
        sales: body,
      },
    }
  );
};

export const getSalesByUsername = async (username: string, id: string) => {
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
        _id: "$sales._id",
        username: "$sales.username",
        nama: "$sales.nama",
        noHP: "$sales.noHP",
        alamat: "$sales.alamat",
      },
    },
  ]);
};
