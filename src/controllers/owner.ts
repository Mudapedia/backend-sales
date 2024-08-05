import { Request, Response, NextFunction } from "express";

const ownerControl = {
  get(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("oke");
    } catch (error) {
      next(error);
    }
  },
};

export default ownerControl;
