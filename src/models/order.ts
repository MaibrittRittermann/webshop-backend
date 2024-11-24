import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';
import { IProduct } from './product'; // Importer IProduct interface
import { IUser } from './user'; // Importer IUser interface

interface IOrder extends Document {
    user: IUser['_id']; // Reference til User
    products: {
        product: IProduct['_id']; // Reference til Product
        quantity: number;
    }[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserTS', required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'ProductTS', required: true },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const validateOrder = (order: IOrder) => {
    const orderSchema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().required()
        })).required(),
        total: Joi.number().required(),
        status: Joi.string().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    });
    return orderSchema.validate(order);
};

export default mongoose.model<IOrder>('OrderTS', OrderSchema);