import Joi from "joi";
import { RegisterOwner } from "../requestBody/auth";

class Schema {
  protected static get schemaRegisterOwner() {
    return Joi.object({
      username: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).required(),
    });
  }
}

class AuthValidation extends Schema {
  static registerOwner(body: RegisterOwner) {
    return this.schemaRegisterOwner.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default AuthValidation;
