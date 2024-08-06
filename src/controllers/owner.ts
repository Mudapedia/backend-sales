import { Request, Response, NextFunction } from "express";
import { getById } from "../services/auth";
import ResponseErr from "../middlewares/responseError";
import { CustomReq } from "../types/expressTypes";

const ownerControl = {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq: CustomReq = req as CustomReq;
      const user = await getById(customReq._id);
      if (!user) {
        throw new ResponseErr("User tidak ditemukan.", 400);
      }
      return res.status(200).json(user).end();
    } catch (error) {
      next(error);
    }
  },
};

export default ownerControl;
