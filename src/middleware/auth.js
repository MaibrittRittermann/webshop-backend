"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const winston_1 = __importDefault(require("winston"));
function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        res.status(401).send("Login to proceed");
    else {
        try {
            const SECRET_KEY = config_1.default.JWTPKWEBSHOP;
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.token = decoded;
            next();
        }
        catch (err) {
            winston_1.default.error("Authentication error", err);
            res.status(400).send("Invalid token");
        }
    }
}
