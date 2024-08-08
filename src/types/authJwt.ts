import { JwtPayload } from "jsonwebtoken";

export interface DecodedJwt extends JwtPayload {
  _id: string;
  token: string;
}
