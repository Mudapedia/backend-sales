import { Request, Response, NextFunction } from "express";
import ResponseErr from "../middlewares/responseError";
import { LoginOwner, RegisterOwner } from "../types/requestBody/auth";
import AuthValidation from "../validation/auth";
import random from "../helpers/salt";
import { getByEmail, registerOwner } from "../services/auth";
import encription from "../helpers/encription";
import jwt from "jsonwebtoken";

const authControl = {
  async registerOwner(req: Request, res: Response, next: NextFunction) {
    try {
      const body: RegisterOwner = req.body;
      await AuthValidation.registerOwner(body);

      const checkEmail = await getByEmail(body.email);

      if (checkEmail) {
        throw new ResponseErr("Email sudah terdaftar", 400);
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("env error");
      }

      const salt: string = random();

      body.password = encription(salt, body.password, process.env.SECRET_KEY);
      body.salt = salt;

      await registerOwner(body);

      res.status(200).json({ message: "Register berhasil" });
    } catch (error) {
      next(error);
    }
  },

  async loginOwner(req: Request, res: Response, next: NextFunction) {
    const body: LoginOwner = req.body;
    await AuthValidation.loginOwner(body);

    const user: any = await getByEmail(body.email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      throw new ResponseErr("Periksa email dan password anda", 400);
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("env error");
    }

    const expectedHash = encription(
      user.authentication?.salt,
      body.password,
      process.env.SECRET_KEY
    );

    if (expectedHash !== user.authentication.password) {
      throw new ResponseErr("Periksa email dan password anda", 400);
    }

    const salt = random();
    const token = encription(salt, user._id, process.env.SECRET_KEY);
    user.authentication.token = token;
    await user.save();

    const tokenJWT = jwt.sign(
      { _id: user._id, token: token },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ message: "Login berhasil", token: tokenJWT });
  },
};

export default authControl;
