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
exports.validateReview = void 0;
const express_1 = require("express");
const product_1 = __importDefault(require("../models/product"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield product_1.default.findById(req.params._id).select('reviews'));
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, exports.validateReview)(req.body);
    if (error)
        return res.status(400).send(error.message);
    console.log("create review");
    try {
        const result = yield product_1.default.updateOne({ _id: req.body._id }, { $push: { reviews: {
                    rating: req.body.rating,
                    name: req.body.name,
                    email: req.body.email,
                    review: req.body.review
                } } });
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.send({ message: `Det lykkedes ikke at oprette review` });
    }
    ;
    // res.send({message: `tak for dit review ${req.body.name}`});
}));
const validateReview = (body) => {
    const ReviewSchema = joi_1.default.object({
        _id: joi_1.default.string().required(),
        name: joi_1.default.string().min(2).max(72).required(),
        email: joi_1.default.string().email(),
        rating: joi_1.default.number(),
        review: joi_1.default.string().required()
    });
    return ReviewSchema.validate(body);
};
exports.validateReview = validateReview;
exports.default = router;
