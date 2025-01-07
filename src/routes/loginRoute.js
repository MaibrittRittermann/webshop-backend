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
const express_1 = require("express");
const auth_1 = __importDefault(require("../models/auth"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const route = (0, express_1.Router)();
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const admin = yield auth_1.default.findOne().or([{ email: req.body.username }, { username: req.body.username }]);
    if (!admin)
        return res.status(400).send("Invalid username and password!");
    const validPassword = yield bcryptjs_1.default.compare(req.body.password, admin.password);
    if (!validPassword)
        return res.status(400).send("Invalid username and password!");
    res.send(admin.generateAuthToken());
}));
function validate(body) {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(8).max(255).required(),
        password: joi_1.default.string().min(8).max(255).required()
    });
    return schema.validate(body);
}
exports.default = route;
