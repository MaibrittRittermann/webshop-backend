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
exports.validateProduct = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const ProductSchema = new mongoose_1.Schema({
    sku: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    seo: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
});
const validateProduct = (prod) => {
    const productSchema = joi_1.default.object({
        sku: joi_1.default.string().min(2).max(50).required(),
        name: joi_1.default.string().min(2).max(72).required(),
        description: joi_1.default.string(),
        seo: joi_1.default.string(),
        category: joi_1.default.string().required(),
        image: joi_1.default.string(),
        price: joi_1.default.number().required()
    });
    return productSchema.validate(prod);
};
exports.validateProduct = validateProduct;
exports.default = mongoose_1.default.model('ProductTS', ProductSchema);
