"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../../models/auth"));
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('auth.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id: new mongoose_1.default.Types.ObjectId().toHexString(),
            username: 'a',
            access: 'admin'
        };
        const user = new auth_1.default(payload);
        const token = user.generateAuthToken();
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWTPKWEBSHOP);
        expect(decoded).toMatchObject(payload);
    });
});
