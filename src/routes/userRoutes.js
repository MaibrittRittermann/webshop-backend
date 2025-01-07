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
const user_1 = __importStar(require("../models/user"));
const validateObjectId_1 = __importDefault(require("./../middleware/validateObjectId"));
const auth_1 = __importDefault(require("./../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield user_1.default.find());
}));
router.get('/:id', validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield user_1.default.findById(req.params.id));
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.message);
    const exist = yield user_1.default.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
    if (exist)
        return res.status(400).send("En brugeren med de angivne oplysninger er allerede oprettet.");
    const newUser = new user_1.default(req.body);
    try {
        yield newUser.save();
        res.status(201).send(newUser);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.put('/:id', [auth_1.default, validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
router.delete('/:id', [auth_1.default, validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndDelete(req.params.id);
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
module.exports = router;
