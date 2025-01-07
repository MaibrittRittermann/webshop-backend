import mongoose, { Document, Schema } from 'mongoose';
import Joi, { CustomHelpers } from 'joi';

import { IProduct } from './product';
// import { UserSchema } from './user'; 

interface IOrder extends Document {
    customer: {
        name: string;
        address: string;
        zip: number;
        city: string;
        phone: string;
        email: string;
    }; 
    products: {
        product: {
            productId: IProduct['_id']; 
            sku: string;
            name: string;
            image: string;
            price: number;
        },
        quantity: number;
    }[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    // user: new Schema({
    //     customer: { type: UserSchema, required: true }
    // }),
    // customer: { type: UserSchema, required: true },
    customer: {
        name: {type: String, required: true},
        address: {type: String, required: true},
        zip: {type: Number, required: true},
        city: {type: String, required: true},
        phone: {type: String, required: true},
        email: {type: String, required: true}
    },
    products: [{product: {
        _id: { type: mongoose.Types.ObjectId, ref: 'ProductTS', required: true },
        sku: {type: String, required: true},
        name: {type: String, required: true},
        image: {type: String},
        price: {type: Number, required: true}
        },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, required: true, default: "new" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const objectIdValidator = (value: string, helpers: CustomHelpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }

export const validateOrder = (order: IOrder) => {
    const orderSchema = Joi.object({
        customer: {
            name: Joi.string().min(2).max(50).required(),
            address: Joi.string().min(2).max(72).required(),
            zip: Joi.number().required(),
            city: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        products: Joi.array().items(Joi.object({product: Joi.object({
            _id: Joi.custom(objectIdValidator, 'Validate ObjectID').required(),
            sku: Joi.string().required(),
            name: Joi.string().required(),
            image: Joi.string(),
            price: Joi.number(),
            }),
            quantity: Joi.number().required()
        })).required(),
        total: Joi.number().required(),
        status: Joi.string(),
    });
    return orderSchema.validate(order);
};

export default mongoose.model<IOrder>('OrderTS', OrderSchema);