import Joi from "joi";
import { LoginSales, RegisterSales } from "../types/requestBody/auth";
import { EditSales } from "../types/requestBody/owner";

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
}

export default SalesValidation;
