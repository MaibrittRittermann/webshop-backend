"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
if (process.env.NODE_ENV !== "production")
    require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const logging_1 = __importDefault(require("./startup/logging"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./startup/routes"));
const db_1 = __importDefault(require("./startup/db"));
(0, logging_1.default)();
const app = (0, express_1.default)();
(0, db_1.default)();
(0, routes_1.default)(app);
const port = process.env.PORT || 3000;
exports.server = app.listen(port, () => { console.log(`listening on ${port}`); });
