"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRoutes = startRoutes;
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("../routes/productRoutes"));
const error_1 = __importDefault(require("./../middleware/error"));
function startRoutes(app) {
    app.use(body_parser_1.default.json());
    app.use('/api/product', productRoutes_1.default);
    app.use(error_1.default);
}
