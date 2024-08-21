import { NextFunction, Request, Response } from "express";
import { CustomReq } from "../types/expressTypes";
import { deleteSalesService, getAllSalesService } from "../services/sales";
import ResponseErr from "../middlewares/responseError";
import { isValidObjectId } from "mongoose";

const salesControl = {
  async getAllInventoryOwner(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "Semua inventory owner", data: [] });
    } catch (error) {
      next(error);
    }
  },
  async getAllSales(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const data = await getAllSalesService(customReq._id);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  },
  async deleteSalesAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const idSales = customReq.params.id;
      if (!isValidObjectId(idSales)) {
        throw new ResponseErr("Invalid id sales", 400);
      }

      const result = await deleteSalesService(customReq._id, idSales);

      if (result.modifiedCount === 0) {
        throw new ResponseErr("Gagal menghapus data", 400);
      }
      res.status(200).json({ message: "Akun berhasil dihapus." });
    } catch (error) {
      next(error);
    }
  },
};

export default salesControl;
