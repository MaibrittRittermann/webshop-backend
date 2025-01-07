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
const express_1 = __importDefault(require("express"));
const order_1 = __importStar(require("../models/order"));
const validateObjectId_1 = __importDefault(require("../middleware/validateObjectId"));
const mailer_1 = require("../services/mailer");
const config_1 = __importDefault(require("../config"));
const router = express_1.default.Router();
// Opret en ny ordre
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, order_1.validateOrder)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const order = new order_1.default(req.body);
    try {
        yield order.save();
        const mail = (0, mailer_1.generateOrderHTML)(req.body);
        (0, mailer_1.sendMail)(config_1.default.MAIL_USERNAME, req.body.email, `Tak for din ordre ${req.body.name}`, mail);
        res.status(201).send(order);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
// Hent alle ordrer
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find();
        res.send(orders);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
// Hent en specifik ordre
router.get('/:id', [validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.default.findById(req.params.id);
        if (!order)
            return res.status(404).send('Order not found.');
        res.send(order);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
// Opdater en ordre
router.put('/:id', [validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, order_1.validateOrder)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const order = yield order_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { updatedAt: new Date() }), { new: true, runValidators: true });
        if (!order)
            return res.status(404).send('Order not found.');
        res.send(order);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
// Slet en ordre
router.delete('/:id', [validateObjectId_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.default.findByIdAndDelete(req.params.id);
        if (!order)
            return res.status(404).send('Order not found.');
        res.send(order);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
