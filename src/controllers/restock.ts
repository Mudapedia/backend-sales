import { NextFunction, Request, Response } from "express";
import { CustomReq } from "../types/expressTypes";
import { typeRestock } from "../types/requestBody/restock";
import RestockValidation from "../validation/restock";
import { newRestock, updateQtyInventory } from "../services/restok";
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

      const result = await newRestock(body, customReq._id);

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
};

export default restockControl;
