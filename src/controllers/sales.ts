import { NextFunction, Request, Response } from "express";
import { CustomReq } from "../types/expressTypes";
import { getAllSalesService } from "../services/sales";

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
};

export default salesControl;
