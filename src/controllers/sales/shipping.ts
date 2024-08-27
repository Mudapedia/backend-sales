import { Request, Response, NextFunction } from "express";
import { CustomReq } from "../../types/expressTypes";
import ResponseErr from "../../middlewares/responseError";
import {
  salesShippingService,
  updateStatusShippingService,
} from "../../services/sales/shipping";

const salesShippingControl = {
  async getAllShipping(req: Request, res: Response, next: NextFunction) {
    try {
      const CustomReq: CustomReq = req as CustomReq;
      const result = await salesShippingService(CustomReq._idSales);
      if (result.length <= 0) {
        throw new ResponseErr("Data tidak ditemukan", 404);
      }
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateStatusShipping(req: Request, res: Response, next: NextFunction) {
    try {
      const CustomReq: CustomReq = req as CustomReq;
      const result = await updateStatusShippingService(
        CustomReq._idSales,
        CustomReq.params.idShipping,
        req.body.status
      );
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default salesShippingControl;
