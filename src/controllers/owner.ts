import { Request, Response, NextFunction } from "express";
import { getById } from "../services/auth";
import ResponseErr from "../middlewares/responseError";

const ownerControl = {
  get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = getById(userId);
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
