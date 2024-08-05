import OwnerCol from "../models/owner";
import { Request, Response, NextFunction } from "express";
import { RegisterOwner } from "../requestBody/auth";

const authServices = {
  async registerOwner(body: RegisterOwner) {
    const insert = new OwnerCol({
      username: body.username,
      email: body.email,
      authentication: {
        password: body.password,
        salt: body.salt,
      },
    });
    await insert.save();
  },
  async getByEmail(email: string) {
    return await OwnerCol.findOne({ email: email });
  },
};

export default authServices;
