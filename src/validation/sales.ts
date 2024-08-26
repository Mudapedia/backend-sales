import Joi from "joi";
import { LoginSales, RegisterSales } from "../types/requestBody/auth";
import { EditSales } from "../types/requestBody/owner";
import { AddInventorySales } from "../types/requestBody/sales";
import { isValidObjectId } from "mongoose";

class Schema {
  protected static get schemaRegisterSales() {
    return Joi.object({
      nama: Joi.string().trim().required(),
      username: Joi.string().trim().required(),
      noHP: Joi.string().trim().required(),
      alamat: Joi.string().trim().required(),
      password: Joi.string().trim().min(8).required(),
    });
  }

  protected static get schemaLoginSales() {
    return Joi.object({
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
  }

  protected static get schemaEditSales() {
    return Joi.object({
      nama: Joi.string().trim().required(),
      username: Joi.string().trim().required(),
      noHP: Joi.string().trim().required(),
      alamat: Joi.string().trim().required(),
    });
  }

  protected static get schemaAddInventorySales() {
    return Joi.object({
      data: Joi.array()
        .min(1)
        .items(
          Joi.object({
            id_produk: Joi.string()
              .trim()
              .required()
              .custom((value, helpers) => {
                if (!isValidObjectId(value)) {
                  return helpers.error("id.invalid");
                }
              })
              .messages({
                "id.invalid": "Id invalid",
              }),
            kode_produk: Joi.string().trim().required(),
            nama_produk: Joi.string().trim().required(),
          })
        )
        .required(),
    });
  }
}

class SalesValidation extends Schema {
  static register(body: RegisterSales) {
    return this.schemaRegisterSales.validateAsync(body, {
      abortEarly: false,
    });
  }

  static login(body: LoginSales) {
    return this.schemaLoginSales.validateAsync(body, {
      abortEarly: false,
    });
  }

  static edit(body: EditSales) {
    return this.schemaEditSales.validateAsync(body, {
      abortEarly: false,
    });
  }

  static addInventory(body: AddInventorySales) {
    return this.schemaAddInventorySales.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default SalesValidation;
