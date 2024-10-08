import { NextFunction, Request, Response } from "express";
import { editBarang, InventoryAdd } from "../types/requestBody/inventory";
import { CustomReq } from "../types/expressTypes";
import InventoryValidation from "../validation/inventory";
import {
  addInventoryService,
  getByKodeProdukInventory,
  deleteProductByIdProduct,
  getProductsByOwner,
  editDataBarang,
} from "../services/inventory";
import { isValidObjectId } from "mongoose";
import ResponseErr from "../middlewares/responseError";

const inventoryControl = {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const body: InventoryAdd = customReq.body;
      await InventoryValidation.add(body);

      const kodeProduk = await getByKodeProdukInventory(
        customReq._id,
        body.kode_produk
      );

      if (kodeProduk.length) {
        throw new ResponseErr("Kode produk sudah ada", 400);
      }

      await addInventoryService(body, customReq._id);

      res.status(201).json({ message: "Berhasil menambahkan inventory" });
    } catch (error) {
      next(error);
    }
  },
  async getAllProduk(req: Request, res: Response) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const allProduk = await getProductsByOwner(customReq._id);
      if (!allProduk) {
        throw new ResponseErr("Data Tidak ditemukan ", 400);
      }
      return res.status(200).json(allProduk).end();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
  async editData(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      if (!isValidObjectId(customReq.params.id)) {
        throw new ResponseErr("Invalid parameter", 400);
      }

      const body: editBarang = customReq.body;
      await InventoryValidation.edit(body);

      const result = await editDataBarang(
        body,
        customReq._id,
        customReq.params.id
      );

      if (result.modifiedCount === 0) {
        throw new ResponseErr("Inventory not found", 404);
      }

      res.status(200).json({ message: "Berhasil mengubah inventory" });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduk(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const idProduk = customReq.params.idProduk;

      if (!isValidObjectId(idProduk)) {
        throw new ResponseErr("invalid parameter", 400);
      }

      const result = await deleteProductByIdProduct(customReq._id, idProduk);

      if (result.modifiedCount > 0) {
        return res.status(200).json({ message: "Produk berhasil dihapus" });
      } else {
        throw new ResponseErr("Produk tidak ditemukan", 400);
      }
    } catch (error) {
      next(error);
    }
  },
};

export default inventoryControl;
