"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("webshop");
const handleError = (err, req, res, next) => {
    debug(err);
    res.status(500).send("Der er opstået en fejl");
};
exports.default = handleError;
