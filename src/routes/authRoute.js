"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const auth_1 = __importStar(require("../models/auth"));
const validateObjectId_1 = __importDefault(require("./../middleware/validateObjectId"));
const auth_2 = __importDefault(require("../middleware/auth"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const router = (0, express_1.Router)();
router.get('/', auth_2.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield auth_1.default.find());
}));
router.get('/:id', [auth_2.default, validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield auth_1.default.findById(req.params.id));
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, auth_1.validateAuth)(req.body);
    if (error)
        return res.status(400).send(error.message);
    const exist = yield auth_1.default.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (exist)
        return res.status(400).send("En bruger med de angivne oplysninger er allerede oprettet.");
    const newUser = new auth_1.default(req.body);
    try {
        bcryptjs_1.default.genSalt(10, function (err, salt) {
            bcryptjs_1.default.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;
                const token = jsonwebtoken_1.default.sign({ _id: newUser._id, access: newUser.access }, config_1.default.JWTPKWEBSHOP);
                newUser.save().then(() => {
                    res
                        .status(201)
                        .header("access-control-expose-headers", "x-auth-token")
                        .header("x-auth-token", token)
                        .send(`Bruger ${newUser.username} med email ${newUser.email} er oprettet`);
                });
            });
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.delete('/:id', [auth_2.default, validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.default.findByIdAndDelete(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send('Brugeren fandtes ikke.');
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
