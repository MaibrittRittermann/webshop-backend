"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = startRoutes;
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("../routes/productRoutes"));
const loginRoute_1 = __importDefault(require("../routes/loginRoute"));
const orderRoute_1 = __importDefault(require("../routes/orderRoute"));
const authRoute_1 = __importDefault(require("../routes/authRoute"));
const error_1 = __importDefault(require("./../middleware/error"));
const reviewRoute_1 = __importDefault(require("../routes/reviewRoute"));
function startRoutes(app) {
    app.use(body_parser_1.default.json());
    const corsOptions = {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use('/api/product', productRoutes_1.default);
    app.use('/api/product/review', reviewRoute_1.default);
    app.use('/api/login', loginRoute_1.default);
    app.use('/api/order', orderRoute_1.default);
    app.use('/api/auth', authRoute_1.default);
    app.use(error_1.default);
}
