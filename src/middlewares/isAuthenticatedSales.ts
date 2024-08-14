import express, { NextFunction, Request, Response } from "express";
import ResponseErr from "./responseError";
import { getById, getByIdSales, getByToken } from "../services/auth";
import jwtVerify from "../helpers/jwtVerify";
import { DecodedJwt } from "../types/authJwt";
import { JwtPayload } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { CustomReq } from "../types/expressTypes";

const isAuthenticatedSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq: CustomReq = req as CustomReq;

    const ReqToken: string | undefined = customReq.headers.authorization;
    if (!ReqToken) {
      throw new ResponseErr("Forbidden", 403);
    }

    const [schema, token] = ReqToken.split(" ");

    if (schema !== "Bearer") {
      throw new ResponseErr("Forbidden", 403);
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("Invalid env");
    }

    const decoded: DecodedJwt = await jwtVerify(token, process.env.SECRET_KEY);
    if (!isValidObjectId(decoded._id)) {
      throw new ResponseErr("Forbidden", 403);
    }

    const user = await getByIdSales(decoded._id);

    if (!user) {
      throw new ResponseErr("Forbidden", 403);
    }

    // if (decoded.token !== user.authentication?.token) {
    //   throw new ResponseErr("Forbidden", 403);
    // }

    customReq._id = decoded._id;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticatedSales;
