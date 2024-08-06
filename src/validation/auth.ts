import Joi from "joi";
import { LoginOwner, RegisterOwner } from "../requestBody/auth";

class Schema {
  protected static get schemaRegisterOwner() {
    return Joi.object({
      username: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).required(),
    });
  }
  protected static get schemaLoginOwner() {
    return Joi.object({
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
  }
}

class AuthValidation extends Schema {
  static registerOwner(body: RegisterOwner) {
    return this.schemaRegisterOwner.validateAsync(body, {
      abortEarly: false,
    });
  }
  static loginOwner(body: LoginOwner) {
    return this.schemaLoginOwner.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default AuthValidation;
