"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseError_1 = __importDefault(require("../middlewares/responseError"));
const auth_1 = __importDefault(require("../validation/auth"));
const salt_1 = __importDefault(require("../helpers/salt"));
const auth_2 = require("../services/auth");
const encription_1 = __importDefault(require("../helpers/encription"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sales_1 = __importDefault(require("../validation/sales"));
const sales_2 = require("../services/sales");
const authControl = {
    registerOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                yield auth_1.default.registerOwner(body);
                const checkEmail = yield (0, auth_2.getByEmail)(body.email);
                if (checkEmail) {
                    throw new responseError_1.default("Email sudah terdaftar", 400);
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("env error");
                }
                const salt = (0, salt_1.default)();
                body.password = (0, encription_1.default)(salt, body.password, process.env.SECRET_KEY);
                body.salt = salt;
                yield (0, auth_2.registerOwner)(body);
                res.status(200).json({ message: "Register berhasil" });
            }
            catch (error) {
                next(error);
            }
        });
    },
    loginOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const body = req.body;
                yield auth_1.default.loginOwner(body);
                const user = yield (0, auth_2.getByEmail)(body.email).select("+authentication.salt +authentication.password");
                if (!user) {
                    throw new responseError_1.default("Periksa email dan password anda", 400);
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("env error");
                }
                const expectedHash = (0, encription_1.default)((_a = user.authentication) === null || _a === void 0 ? void 0 : _a.salt, body.password, process.env.SECRET_KEY);
                if (expectedHash !== user.authentication.password) {
                    throw new responseError_1.default("Periksa email dan password anda", 400);
                }
                const salt = (0, salt_1.default)();
                const token = (0, encription_1.default)(salt, user._id, process.env.SECRET_KEY);
                user.authentication.token = token;
                yield user.save();
                const tokenJWT = jsonwebtoken_1.default.sign({ _id: user._id, token: token }, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                });
                return res
                    .status(200)
                    .json({ message: "Login berhasil", token: tokenJWT });
            }
            catch (error) {
                next(error);
            }
        });
    },
    createSalesAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = customReq.body;
                yield auth_1.default.createSalesAccount(body);
                const cekSales = yield (0, auth_2.getSalesByUsername)(body.username, customReq._id);
                if (Array.isArray(cekSales) && cekSales.length > 0) {
                    throw new responseError_1.default("Username sales sudah terdaftar", 400);
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("env error");
                }
                const salt = (0, salt_1.default)();
                body.password = (0, encription_1.default)(salt, body.password, process.env.SECRET_KEY);
                body.salt = salt;
                const response = yield (0, auth_2.addSalesAccount)(body, customReq._id);
                if (response.modifiedCount === 0) {
                    throw new responseError_1.default("Gagal register user", 400);
                }
                res.status(200).json({ message: "berhasil membuat akun sales." });
            }
            catch (error) {
                next(error);
            }
        });
    },
    loginSales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                yield sales_1.default.login(body);
                const user = yield (0, sales_2.searchSalesByUsernameLoginService)(body.username);
                if (!user.length) {
                    throw new responseError_1.default("Periksa username atau password anda", 400);
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("Invalid env");
                }
                const expectedHash = (0, encription_1.default)(user[0].sales.salt, body.password, process.env.SECRET_KEY);
                if (user[0].sales.password !== expectedHash) {
                    throw new responseError_1.default("Periksa username atau password anda", 400);
                }
                const salt = (0, salt_1.default)();
                const hashPassword = (0, encription_1.default)(salt, body.password, process.env.SECRET_KEY);
                const token = (0, encription_1.default)(salt, user[0].sales._id, process.env.SECRET_KEY);
                const tokenJWT = jsonwebtoken_1.default.sign({ _id: user[0].sales._id, token: token }, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                });
                yield (0, sales_2.editPasswordAndSaltSalesService)(user[0].sales._id, hashPassword, salt, token);
                res
                    .status(200)
                    .json({ message: "Login sales berhasil", token: tokenJWT });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = authControl;
