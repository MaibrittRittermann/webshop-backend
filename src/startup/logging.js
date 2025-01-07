"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logging;
require('express-async-errors');
const winston_1 = __importDefault(require("winston"));
function logging() {
    const logfile = new winston_1.default.transports.File({ filename: 'logfile.log' });
    winston_1.default.rejections.handle(logfile);
    winston_1.default.exceptions.handle(logfile);
    winston_1.default.add(logfile);
}
