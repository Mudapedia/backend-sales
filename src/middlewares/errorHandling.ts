import { Request, Response, NextFunction } from "express";
import ResponseErr from "./responseError";
import Joi from "joi";

const errorHandling = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseErr) {
    res.status(error.getStatusCode).json({ errors: [error.message] });
    return;
  } else if (error instanceof Joi.ValidationError) {
    res.status(400).json({ errors: error.message.split(".") });
    return;
  }

  res.status(500).json({ error: error.message });
};

export default errorHandling;
