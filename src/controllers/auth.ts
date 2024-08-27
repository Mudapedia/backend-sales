import { Request, Response, NextFunction } from "express";
import ResponseErr from "../middlewares/responseError";
import {
  ForgotPassword,
  LoginOwner,
  LoginSales,
  RegisterOwner,
  RegisterSales,
  ResetPassword,
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
import {
  addOTPOwner,
  getOwnerByEmail,
  resetPasswordOwnerServices,
} from "../services/owner";
import nodemailer from "nodemailer";
import { TOTP } from "otpauth";
import mongoose from "mongoose";

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
      const body: LoginSales = req.body;
      await SalesValidation.login(body);

      const user: any = await searchSalesByUsernameLoginService(body.username);

      if (!user.length) {
        throw new ResponseErr("Periksa username atau password anda", 400);
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("Invalid env");
      }

      const expectedHash = encription(
        user[0].sales.salt,
        body.password,
        process.env.SECRET_KEY
      );

      if (user[0].sales.password !== expectedHash) {
        throw new ResponseErr("Periksa username atau password anda", 400);
      }

      const salt = random();
      const hashPassword = encription(
        salt,
        body.password,
        process.env.SECRET_KEY
      );

      const token = encription(salt, user[0].sales._id, process.env.SECRET_KEY);

      const tokenJWT = jwt.sign(
        { _id: user[0].sales._id, token: token },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      await editPasswordAndSaltSalesService(
        user[0].sales._id,
        hashPassword,
        salt,
        token
      );

      res
        .status(200)
        .json({ message: "Login sales berhasil", token: tokenJWT });
    } catch (error) {
      next(error);
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const body: ForgotPassword = req.body;
      await AuthValidation.forgotPassword(body);

      if (!process.env.SECRET_OTP) {
        throw new Error("Invalid env");
      }

      if (!process.env.SECRET_EMAIL) {
        throw new Error("Invalid env");
      }

      if (!process.env.SECRET_EMAIL_AUTH) {
        throw new Error("Invalid env");
      }

      await AuthValidation.forgotPassword(body);

      const check = await getOwnerByEmail(body.email);

      if (!check) {
        throw new ResponseErr("Perikasa email anda", 400);
      }

      const totp = new TOTP({
        issuer: "sales-app",
        label: process.env.SECRET_EMAIL,
        algorithm: "SHA1",
        digits: 6,
        period: 600,
        secret: process.env.SECRET_OTP,
      });

      const otp = totp.generate();
      await addOTPOwner(body.email, otp, session);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.SECRET_EMAIL,
          pass: process.env.SECRET_EMAIL_AUTH,
        },
        debug: true,
      });

      const info = await transporter.sendMail({
        from: '"Bapak, aku mau nyalon😁" <muudapedia@gmail.com>', // sender address
        to: body.email, // list of receivers
        subject: "Kaesang", // Subject line
        html: `<b>otp anda ${otp} berakhir dalam 10 menit</b>`, // html body
      });

      await session.commitTransaction();
      res.status(200).json({
        message: "OTP sudah terkirim diemail anda",
        messageID: info.messageId,
      });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ResetPassword = req.body;
      await AuthValidation.resetPassword(body);

      if (!process.env.SECRET_OTP) {
        throw new Error("Invalid env");
      }

      if (!process.env.SECRET_EMAIL) {
        throw new Error("Invalid env");
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("Invalid env");
      }

      const check = await getOwnerByEmail(body.email);

      if (!check) {
        throw new ResponseErr("Perikasa email anda", 400);
      }

      if (!check.authentication?.otp) {
        throw new ResponseErr("Akses lupa password terlebih dahulu", 400);
      }

      const totp = new TOTP({
        issuer: "sales-app",
        label: process.env.SECRET_EMAIL,
        algorithm: "SHA1",
        digits: 6,
        period: 600,
        secret: process.env.SECRET_OTP,
      });

      const isValid = totp.validate({
        token: check.authentication.otp,
        window: 1,
      });

      if (isValid === null) {
        throw new ResponseErr("OTP sudah tidak berlaku", 400);
      }

      const salt: string = random();
      const hashPassword = encription(
        salt,
        body.newPassword,
        process.env.SECRET_KEY
      );
      await resetPasswordOwnerServices(check._id, hashPassword, salt);

      res.status(200).json({ message: "berhasil reset password" });
    } catch (error) {
      next(error);
    }
  },
};

export default authControl;
