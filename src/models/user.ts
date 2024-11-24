import mongoose, {Document, Schema} from 'mongoose';
import Joi from 'joi';

export interface IUser extends Document {
    name: string;
    address: string;
    zip: number;
    city: string;
    phone: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    zip:{type: Number, required: true},
    city: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
});

export const validateUser = (prod : IUser) => {

    const userSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(2).max(72).required(),
        zip: Joi.number().required(),
        city: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string(),
    })
    return userSchema.validate(prod);
}

export default mongoose.model<IUser>('UserTS', UserSchema);