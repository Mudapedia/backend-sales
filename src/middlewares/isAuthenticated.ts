import express, { NextFunction, Request, Response } from "express";
import ResponseErr from "./responseError";
import { getByToken } from "../services/auth";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  const token = req.cookies["SALES-APP"];
  // if (!token) {
  //   throw new ResponseErr("Forbidden", 403);
  // }

  // const user = await getByToken(token);
  // if (!user) {
  //   throw new ResponseErr("Forbidden", 403);
  // }
  // return next();
};

export default isAuthenticated;
