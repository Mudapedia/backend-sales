import { NextFunction, Request, Response } from "express";
import { CustomReq } from "../types/expressTypes";
import { AddInventorySales } from "../types/requestBody/sales";
import SalesValidation from "../validation/sales";
import { getManyInventory } from "../services/inventory";
import mongoose from "mongoose";
import ResponseErr from "../middlewares/responseError";
import {
  getManyInventorySales,
  insertManyInventorySales,
} from "../services/inventorySales";

const inventorySales = {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: AddInventorySales = customReq.body;
      await SalesValidation.addInventory(body);

      let query: mongoose.Types.ObjectId[] = [];

      for (let i = 0; i < body.data.length; i++) {
        query.push(new mongoose.Types.ObjectId(body.data[i]._id));
      }

      const check = await getManyInventory(customReq._id, query);

      if (body.data.length !== check.length) {
        throw new ResponseErr("Periksa data body anda", 400);
      }

      const checkInventorySales = await getManyInventorySales(
        customReq._id,
        query
      );

      if (!checkInventorySales.length) {
        const dataInsertmany = [];
        for (let i = 0; i < check.length; i++) {
          dataInsertmany.push({
            kode_produk: check[i].inventory.kode_produk,
            nama_produk: check[i].inventory.nama_produk,
            qty_produk: body.data[i].qty_produk,
          });
        }
        await insertManyInventorySales(customReq._id, dataInsertmany);
      }

      res
        .status(200)
        .json({ message: "Berhasil menambahkan produk ke inventory sales" });
    } catch (error) {
      next(error);
    }
  },
};

export default inventorySales;
