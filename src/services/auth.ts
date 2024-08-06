import OwnerCol from "../models/owner";
import { RegisterOwner } from "../requestBody/auth";

export const registerOwner = async (body: RegisterOwner) => {
  const insert = new OwnerCol({
    username: body.username,
    email: body.email,
    authentication: {
      password: body.password,
      salt: body.salt,
    },
  });
  await insert.save();
};

export const getByEmail = (email: string) => {
  return OwnerCol.findOne({ email: email });
};

export const getByToken = (token: string) => {
  return OwnerCol.findOne({ "authentication.token": token });
};

export const getById = (id: string) => {
  return OwnerCol.findOne({ _id: id });
};
