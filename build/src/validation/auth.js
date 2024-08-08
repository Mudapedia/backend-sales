"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Schema {
    static get schemaRegisterOwner() {
        return joi_1.default.object({
            username: joi_1.default.string().trim().required(),
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().min(8).required(),
        });
    }
    static get schemaLoginOwner() {
        return joi_1.default.object({
            email: joi_1.default.string().trim().required(),
            password: joi_1.default.string().trim().required(),
        });
    }
}
class AuthValidation extends Schema {
    static registerOwner(body) {
        return this.schemaRegisterOwner.validateAsync(body, {
            abortEarly: false,
        });
    }
    static loginOwner(body) {
        return this.schemaLoginOwner.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = AuthValidation;
