import { Router, Request } from 'express';
import Product from '../models/product';
import Joi from 'joi';

const router = Router();

interface IReview {
    name: string;
    email: string;
    rating: number;
    review: string;
}

router.get('/:id', async (req : Request, res : any) => {
    res.json(await Product.findById(req.params._id).select('reviews'));
});

router.post('/', async(req, res : any) => {

    const {error} = validateReview(req.body);
    if(error) return res.status(400).send(error.message);
    try {
        const result = await Product.updateOne({_id: req.body._id},
            {$push: {reviews: {
                rating: req.body.rating,
                name: req.body.name,
                email: req.body.email,
                review: req.body.review
            }}}
        );
        res.send(result);
    } catch(err) {
        console.log(err);
        res.send({message: `Det lykkedes ikke at oprette review`});
    };

    // res.send({message: `tak for dit review ${req.body.name}`});
});

export const validateReview = (body : IReview) => {

    const ReviewSchema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().min(2).max(72).required(),
        email: Joi.string().email(),
        rating: Joi.number(),
        review: Joi.string().required()
    })
    return ReviewSchema.validate(body);
}

export default router;