import { NextFunction, Request, Response } from "express";
import { CustomReq } from "../types/expressTypes";
import { typeRestock } from "../types/requestBody/restock";
import RestockValidation from "../validation/restock";
import {
  deleteHistoryRestock,
  getAllRestock,
  getRestockById,
  newRestock,
  updateQtyInventory,
} from "../services/restok";
import ResponseErr from "../middlewares/responseError";
import { ulid } from "ulid";

const restockControl = {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: typeRestock = customReq.body;
      await RestockValidation.add(body);

      const kode = ulid();
      const new_body = Object.assign(body, {
        ["kode_restock"]: kode,
      });

      const result = await newRestock(new_body, customReq._id);

      if (result.modifiedCount === 0) {
        throw new ResponseErr("Gagal menambahkan data stok ke server", 400);
      }

      let query = [];
      let inc = {};

      for (let i = 0; i < body.list_produk.length; i++) {
        query.push({
          [`item${i + 1}._id`]: body.list_produk[i].id_produk,
        });
        inc = Object.assign(inc, {
          [`inventory.$[item${i + 1}].qty_gudang`]: body.list_produk[i].qty,
        });
      }

      const resultUpdate = await updateQtyInventory(customReq._id, query, inc);

      if (resultUpdate.modifiedCount === 0) {
        throw new ResponseErr("Gagal menambahkan jumlah stok ke server", 400);
      }

      return res.status(200).json({
        message: "Data berhasil ditambahkan.",
      });
    } catch (error) {
      next(error);
    }
  },
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const result = await getAllRestock(customReq._id);

      if (!result) {
        throw new ResponseErr("Data tidak ditemukan", 400);
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;

      const dataRestock: any = await getRestockById(
        customReq._id,
        customReq.params.idStock
      );

      if (!dataRestock) {
        throw new ResponseErr("Data tidak ditemukan", 400);
      }

      let query = [];
      let inc = {};
      const historyStock = dataRestock.history_stok;

      for (let i = 0; i < historyStock[0].list_produk.length; i++) {
        query.push({
          [`item${i + 1}._id`]: historyStock[0].list_produk[i].id_produk,
        });
        inc = Object.assign(inc, {
          [`inventory.$[item${i + 1}].qty_gudang`]:
            0 - historyStock[0].list_produk[i].qty,
        });
      }

      const resultUpdate = await updateQtyInventory(customReq._id, query, inc);

      if (resultUpdate.modifiedCount === 0) {
        throw new ResponseErr("Gagal Mengurangi Nominal Gudang", 400);
      }

      const result = await deleteHistoryRestock(
        customReq._id,
        customReq.params.idStock
      );

      if (result.modifiedCount === 0) {
        throw new ResponseErr("Gagal menghapus data restock.", 400);
      }
      return res
        .status(200)
        .json({ message: "Berhasil menghapus data restock" });
    } catch (error) {
      next(error);
    }
  },
};

export default restockControl;
