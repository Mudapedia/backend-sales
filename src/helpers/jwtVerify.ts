import jwt from "jsonwebtoken";
import ResponseErr from "../middlewares/responseError";
import { DecodedJwt } from "../types/authJwt";

function isDecodedJwt(decoded: any): decoded is DecodedJwt {
  return (
    decoded &&
    typeof decoded._id === "string" &&
    typeof decoded.token === "string"
  );
}

const jwtVerify = (token: string, secret: string): Promise<DecodedJwt> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        reject(new ResponseErr("Forbidden", 403));
        return;
      }

      if (isDecodedJwt(decoded)) {
        resolve(decoded);
      } else {
        reject(new ResponseErr("Invalid token structure", 400));
      }
    });
  });
};

export default jwtVerify;
