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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const OrderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserTS', required: true },
    products: [{
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ProductTS', required: true },
            quantity: { type: Number, required: true }
        }],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const validateOrder = (order) => {
    const orderSchema = joi_1.default.object({
        user: joi_1.default.string().required(),
        products: joi_1.default.array().items(joi_1.default.object({
            product: joi_1.default.string().required(),
            quantity: joi_1.default.number().required()
        })).required(),
        total: joi_1.default.number().required(),
        status: joi_1.default.string().required(),
        createdAt: joi_1.default.date(),
        updatedAt: joi_1.default.date()
    });
    return orderSchema.validate(order);
};
exports.validateOrder = validateOrder;
exports.default = mongoose_1.default.model('OrderTS', OrderSchema);
