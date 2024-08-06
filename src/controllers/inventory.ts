import { NextFunction, Request, Response } from "express";
import { InventoryAdd, InventoryEdit } from "../types/requestBody/inventory";
import { CustomReq } from "../types/expressTypes";
import InventoryValidation from "../validation/inventory";
import {
  addInventoryService,
  editInventoryService,
  getByIdInventory,
  getByKodeProdukInventory,
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
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      if (!isValidObjectId(customReq.params.id)) {
        throw new ResponseErr("Invalid parameter", 400);
      }

      const body: InventoryEdit = customReq.body;
      await InventoryValidation.add(body);

      const inventory = await getByIdInventory(
        customReq._id,
        customReq.params.id
      );

      if (!inventory.length) {
        throw new ResponseErr("Inventory not found", 404);
      }

      await editInventoryService(body, customReq._id, customReq.params.id);

      res.status(200).json({ message: "Berhasil mengubah inventory" });
    } catch (error) {
      next(error);
    }
  },
};

export default inventoryControl;
