import mongoose, {Document, Schema} from 'mongoose';
import Joi from 'joi';

export interface IProduct extends Document {
    sku: string;
    name: string;
    description: string;
    seo: string;
    category: string;
    image: string;
    price: number;
}

const ProductSchema: Schema = new Schema({
    sku: {type: String, required: true},
    name: {type: String, required: true},
    description:{type: String, required: true},
    seo: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
})

export const validateProduct = (prod : IProduct) => {

    const productSchema = Joi.object({
        sku: Joi.string().min(2).max(50).required(),
        name: Joi.string().min(2).max(72).required(),
        description: Joi.string(),
        seo: Joi.string(),
        category: Joi.string().required(),
        image: Joi.string(),
        price: Joi.number().required()
    })
    return productSchema.validate(prod);
}

export default mongoose.model<IProduct>('ProductTS', ProductSchema);
