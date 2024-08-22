import { Request, Response, NextFunction } from "express";
import { getDetailById } from "../services/auth";
import ResponseErr from "../middlewares/responseError";
import { CustomReq } from "../types/expressTypes";
import SalesValidation from "../validation/sales";
import {
  editSalesService,
  searchSalesByIdService,
  searchSalesByUsernameService,
} from "../services/sales";
import { EditSales } from "../types/requestBody/owner";
import { isValidObjectId } from "mongoose";
import { AddInventorySales } from "../types/requestBody/sales";
import { insertManyInventorySales } from "../services/inventorySales";

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

  async editSales(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: EditSales = customReq.body;

      const idSales: string = customReq.params.id;
      if (!isValidObjectId(idSales)) {
        throw new ResponseErr("Invalid paramter", 400);
      }

      await SalesValidation.edit(body);

      const check = await searchSalesByIdService(customReq._id, idSales);
      if (!check.length) {
        throw new ResponseErr("Sales not found", 404);
      }

      if (check[0].sales.username !== body.username) {
        const checkUsername: any = await searchSalesByUsernameService(
          customReq._id,
          body.username
        );

        if (checkUsername.length) {
          throw new ResponseErr("Username udah ada", 400);
        }
      }

      await editSalesService(customReq._id, idSales, body);

      res.status(200).json({ message: "Berhasil edit sales" });
    } catch (error) {
      next(error);
    }
  },

  async addInventorySales(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: AddInventorySales = customReq.body;
      await SalesValidation.addInventory(body);

      if (!isValidObjectId(customReq.params.idSales)) {
        throw new ResponseErr("Invalid parameter", 400);
      }

      const dataInsertmany = [];
      for (let i = 0; i < body.data.length; i++) {
        dataInsertmany.push({
          kode_produk: body.data[i].kode_produk,
          nama_produk: body.data[i].nama_produk,
        });
      }
      await insertManyInventorySales(
        customReq._id,
        customReq.params.idSales,
        dataInsertmany
      );

      res
        .status(200)
        .json({ message: "Berhasil menambahkan produk ke inventory sales" });
    } catch (error) {
      next(error);
    }
  },
};

export default ownerControl;
