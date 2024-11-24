"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./startup/routes");
const db_1 = __importDefault(require("./startup/db"));
const app = (0, express_1.default)();
(0, db_1.default)();
(0, routes_1.startRoutes)(app);
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on ${port}`); });
