import crypto from "crypto";

const encription = (salt: string, password: string, secret: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};

export default encription;
