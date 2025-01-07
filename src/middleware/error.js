"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const handleError = (err, req, res, next) => {
    winston_1.default.error(err.message, err);
    res.status(500).send(`Der er opstået en fejl: ${err.message}`);
};
exports.default = handleError;
