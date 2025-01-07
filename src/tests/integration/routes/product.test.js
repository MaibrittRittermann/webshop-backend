"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const product_1 = __importDefault(require("../../../models/product"));
const index_1 = require("../../../index");
// let server : express();
// import app from
describe('/api/product', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // server = require("../../../index");
        yield mongoose_1.default.connect(config_1.default.MONGO_URI);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield product_1.default.deleteMany({});
        // await server.close();
        yield mongoose_1.default.connection.close();
    }));
    describe('GET /', () => {
        it('should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield product_1.default.insertMany([
                    {
                        category: "aaa",
                        title: "aaa",
                        image: "aaa",
                        description: "aaa",
                        seo: "aaa",
                        price: 1,
                    },
                    {
                        category: "aaa",
                        title: "bbb",
                        image: "bbb",
                        description: "bbb",
                        seo: "bbb",
                        price: 1,
                    },
                ]);
            }
            catch (e) {
                console.log(e);
            }
            const res = yield (0, supertest_1.default)(index_1.server).get('/api/product');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        }));
    });
});
