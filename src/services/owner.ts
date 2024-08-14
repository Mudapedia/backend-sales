import { RegisterSales } from "../types/requestBody/auth";
import OwnerCol from "../models/owner";

export const registerSalesService = async (id: string, body: RegisterSales) => {
  return OwnerCol.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        sales: {
          nama: body.nama,
          username: body.username,
          noHP: body.noHP,
          alamat: body.alamat,
          authentication: {
            password: body.password,
            salt: body.salt,
          },
        },
      },
    }
  );
};
