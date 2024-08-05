"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ownerControl = {
    get(req, res, next) {
        try {
            res.send("oke");
        }
        catch (error) {
            next(error);
        }
    },
};
exports.default = ownerControl;
