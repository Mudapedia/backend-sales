import crypto from "crypto";

const random = () => {
  return crypto.randomBytes(128).toString("base64");
};

export default random;
