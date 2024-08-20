import { Request, Response, NextFunction } from "express";
import ResponseErr from "../middlewares/responseError";
import {
  LoginOwner,
  LoginSales,
  RegisterOwner,
  RegisterSales,
} from "../types/requestBody/auth";
import AuthValidation from "../validation/auth";
import random from "../helpers/salt";
import {
  addSalesAccount,
  getByEmail,
  getSalesByUsername,
  registerOwner,
} from "../services/auth";
import encription from "../helpers/encription";
import jwt from "jsonwebtoken";
import { CustomReq } from "../types/expressTypes";
import SalesValidation from "../validation/sales";
import {
  editPasswordAndSaltSalesService,
  searchSalesByUsernameLoginService,
} from "../services/sales";

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
    try {
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

      return res
        .status(200)
        .json({ message: "Login berhasil", token: tokenJWT });
    } catch (error) {
      next(error);
    }
  },

  async createSalesAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: RegisterSales = customReq.body;
      await AuthValidation.createSalesAccount(body);

      const cekSales = await getSalesByUsername(body.username, customReq._id);

      if (Array.isArray(cekSales) && cekSales.length > 0) {
        throw new ResponseErr("Username sales sudah terdaftar", 400);
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("env error");
      }

      const salt: string = random();
      body.password = encription(salt, body.password, process.env.SECRET_KEY);
      body.salt = salt;

      const response = await addSalesAccount(body, customReq._id);
      if (response.modifiedCount === 0) {
        throw new ResponseErr("Gagal register user", 400);
      }

      res.status(200).json({ message: "berhasil membuat akun sales." });
    } catch (error) {
      next(error);
    }
  },

  async loginSales(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: LoginSales = req.body;
      await SalesValidation.login(body);

      const user: any = await searchSalesByUsernameLoginService(
        customReq._id,
        body.username
      );

      console.log(user);

      // if (!user.length) {
      //   throw new ResponseErr("Periksa username atau password anda", 400);
      // }

      // if (!process.env.SECRET_KEY) {
      //   throw new Error("Invalid env");
      // }

      // const expectedHash = encription(
      //   user[0].sales.salt,
      //   body.password,
      //   process.env.SECRET_KEY
      // );

      // if (user[0].sales.password !== expectedHash) {
      //   throw new ResponseErr("Periksa username atau password anda", 400);
      // }

      // const salt = random();
      // const hashPassword = encription(
      //   salt,
      //   body.password,
      //   process.env.SECRET_KEY
      // );

      //  const token = encription(salt, user._id, process.env.SECRET_KEY);
      //  user.authentication.token = token;
      //  await user.save();

      //  const tokenJWT = jwt.sign(
      //    { _id: user._id, token: token },
      //    process.env.SECRET_KEY,
      //    {
      //      expiresIn: "1d",
      //    }
      //  );
      // await editPasswordAndSaltSalesService(
      //   customReq._id,
      //   user[0].sales._id,
      //   hashPassword,
      //   salt
      // );

      res.status(200).json({ message: "Login sales berhasil" });
    } catch (error) {
      next(error);
    }
  },
};

export default authControl;
