import { Request, Response, NextFunction } from "express";
import { getDetailById } from "../services/auth";
import ResponseErr from "../middlewares/responseError";
import { CustomReq } from "../types/expressTypes";
import SalesValidation from "../validation/sales";
import {
  editSalesService,
  searchSalesByIdService,
  searchSalesByIdShippingService,
  searchSalesByUsernameService,
} from "../services/sales";
import { EditSales } from "../types/requestBody/owner";
import mongoose, { isValidObjectId } from "mongoose";
import { AddInventorySales } from "../types/requestBody/sales";
import { insertManyInventorySales } from "../services/inventorySales";
import { ShippingType } from "../types/requestBody/shipping";
import {
  ShippingEditQtyServices,
  ShippingInsertServices,
} from "../services/shipping";
import ShippingValidation from "../validation/shipping";

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

      await insertManyInventorySales(
        customReq._id,
        customReq.params.idSales,
        body.data
      );

      res
        .status(200)
        .json({ message: "Berhasil menambahkan produk ke inventory sales" });
    } catch (error) {
      next(error);
    }
  },

  async addShipping(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const customReq: CustomReq = req as CustomReq;
      const body: ShippingType = customReq.body;
      const idSales: string = customReq.params.idSales;
      await ShippingValidation.add(body);

      if (!isValidObjectId(idSales)) {
        throw new ResponseErr("Invalid parameter", 400);
      }

      let query = [];
      let inc = {};

      for (let i = 0; i < body.list_barang.length; i++) {
        query.push({
          [`item${i + 1}._id`]: body.list_barang[i].id_produk,
        });
        inc = Object.assign(inc, {
          [`inventory.$[item${i + 1}].qty_gudang`]:
            0 - body.list_barang[i].qty_barang,
        });
      }

      const check = await ShippingEditQtyServices(
        customReq._id,
        query,
        inc,
        session
      );
      if (check.modifiedCount === 0) {
        throw new ResponseErr("Modified count 0", 400);
      }

      const checkInsert = await ShippingInsertServices(
        customReq._id,
        idSales,
        body,
        session
      );

      if (checkInsert.matchedCount === 0) {
        throw new ResponseErr("Sales tidak ditemukan", 400);
      }

      await session.commitTransaction();
      res.status(200).json({ message: "Shipping berhasil ditambahkan" });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  },
};

export default ownerControl;
