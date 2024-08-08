import { Request, Response, NextFunction } from "express";
import { getDetailById } from "../services/auth";
import ResponseErr from "../middlewares/responseError";
import { CustomReq } from "../types/expressTypes";
import { RegisterSales } from "../types/requestBody/auth";
import SalesValidation from "../validation/sales";
import { registerSalesService } from "../services/owner";
import random from "../helpers/salt";
import encription from "../helpers/encription";
import { searchSalesByUsernameService } from "../services/sales";

const ownerControl = {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const user = await getDetailById(customReq._id);
      if (!user) {
        throw new ResponseErr("User tidak ditemukan.", 400);
      }
      return res.status(200).json(user).end();
    } catch (error) {
      next(error);
    }
  },

  async registerSales(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: RegisterSales = req.body;

      await SalesValidation.register(body);

      const check = await searchSalesByUsernameService(
        customReq._id,
        body.username
      );

      if (check.length) {
        throw new ResponseErr("Username sales sudah ada", 400);
      }
      if (!process.env.SECRET_KEY) {
        throw new Error("env error");
      }

      const salt: string = random();

      body.password = encription(salt, body.password, process.env.SECRET_KEY);
      body.salt = salt;

      await registerSalesService(customReq._id, body);

      res.status(201).json({ message: "Register sales berhasil" });
    } catch (error) {
      next(error);
    }
  },
};

export default ownerControl;
