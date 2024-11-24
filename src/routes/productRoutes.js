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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importStar(require("../models/product"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield product_1.default.find());
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(req.params.id);
    if (!product)
        return res.status(404).send("Produktet blev ikke fundet");
    res.json(product);
}));
router.get('/sku/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findOne({ sku: req.params.id });
    if (!product)
        return res.status(404).send("Produktet blev ikke fundet");
    res.json(product);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, product_1.validateProduct)(req.body);
    if (error)
        return res.status(400).send(error.message);
    const newProduct = new product_1.default(req.body);
    try {
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, product_1.validateProduct)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        const product = yield product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).send('Product not found');
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(204).json(product);
        }
        else {
            res.status(404).send('Product not found');
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
