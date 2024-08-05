import { Request, Response, NextFunction } from "express";
import ResponseErr from "../middlewares/responseError";
import { RegisterOwner } from "../requestBody/auth";
import AuthValidation from "../validation/auth";
import OwnerCol from "../models/owner";
import random from "../helpers/salt";
import authServices from "../services/auth";
import encription from "../helpers/encription";
import { isValidObjectId } from "mongoose";

const authControl = {
  async registerOwner(req: Request, res: Response, next: NextFunction) {
    try {
      const body: RegisterOwner = req.body;
      await AuthValidation.registerOwner(body);

      const checkEmail = await authServices.getByEmail(body.email);

      if (checkEmail) {
        throw new ResponseErr("Email sudah terdaftar", 400);
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("env error");
      }

      const salt: string = random();

      body.password = encription(salt, body.password, process.env.SECRET_KEY);
      body.salt = salt;

      await authServices.registerOwner(body);

      res.status(200).json({ message: "Register berhasil" });
    } catch (error) {
      next(error);
    }
  },
};

export default authControl;
