import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { RegisterOwner } from "../types/requestBody/auth";

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
