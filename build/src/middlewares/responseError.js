"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ResponseErr_status;
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseErr extends Error {
    constructor(msg, status) {
        super(msg);
        _ResponseErr_status.set(this, 0);
        __classPrivateFieldSet(this, _ResponseErr_status, status, "f");
    }
    get getStatusCode() {
        return __classPrivateFieldGet(this, _ResponseErr_status, "f");
    }
}
_ResponseErr_status = new WeakMap();
exports.default = ResponseErr;
