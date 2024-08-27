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
        sales: {
          nama: body.nama,
          username: body.username,
          noHP: body.noHP,
          alamat: body.alamat,
          authentication: {
            password: body.password,
            salt: body.salt,
          },
        },
      },
    }
  );
};

export const getAllShippingOwnerService = (id: string) => {
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
      $unwind: "$sales.shipping",
    },
    {
      $project: {
        email: 0,
        authentication: 0,
        history_stok: 0,
        inventory: 0,
        createdAt: 0,
        updatedAt: 0,
        username: 0,
        "sales.password": 0,
        "sales.salt": 0,
        "sales.token": 0,
        "sales.inventory": 0,
        "sales.createdAt": 0,
        "sales.updatedAt": 0,
        "sales.noHP": 0,
        "sales.isDeleted": 0,
        "sales.alamat": 0,
      },
    },
  ]);
};

export const getOwnerByEmail = (email: string) => {
  return OwnerCol.findOne({ email: email });
};

export const addOTPOwner = (
  email: string,
  otp: string,
  session: mongoose.ClientSession
) => {
  return OwnerCol.updateOne(
    { email: email },
    {
      $set: {
        "authentication.otp": otp,
      },
    },
    {
      session: session,
    }
  );
};

export const resetPasswordOwnerServices = (
  id: mongoose.Types.ObjectId,
  newPassword: string,
  salt: string
) => {
  return OwnerCol.updateOne(
    { _id: id },
    {
      $set: {
        "authentication.password": newPassword,
        "authentication.salt": salt,
        "authentication.otp": null,
      },
    }
  );
};
