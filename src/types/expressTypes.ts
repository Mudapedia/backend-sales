import { Request } from "express";

export interface CustomReq extends Request {
  _id: string;
}
