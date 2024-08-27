import Joi from "joi";
import {
  ForgotPassword,
  LoginOwner,
  RegisterOwner,
  RegisterSales,
  ResetPassword,
} from "../types/requestBody/auth";

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
  protected static get schemaCreateSalesAccount() {
    return Joi.object({
      username: Joi.string().trim().required(),
      nama: Joi.string().trim().required(),
      noHP: Joi.string().trim().required(),
      alamat: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
  }
  protected static get schemaForgotPassword() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
    });
  }
  protected static get schemaResetPassword() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      otp: Joi.string().trim().required(),
      newPassword: Joi.string().trim().min(8).required(),
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
  static createSalesAccount(body: RegisterSales) {
    return this.schemaCreateSalesAccount.validateAsync(body, {
      abortEarly: false,
    });
  }

  static forgotPassword(body: ForgotPassword) {
    return this.schemaForgotPassword.validateAsync(body, {
      abortEarly: false,
    });
  }

  static resetPassword(body: ResetPassword) {
    return this.schemaResetPassword.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default AuthValidation;
