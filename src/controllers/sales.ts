import { NextFunction, Request, Response } from "express";

const salesControl = {
  async getAllInventoryOwner(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "Semua inventory owner", data: [] });
    } catch (error) {
      next(error);
    }
  },
};

export default salesControl;
