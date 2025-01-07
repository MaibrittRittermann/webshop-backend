import mongoose, {Document, Schema, Model} from "mongoose";
import Joi from "joi";
import jwt from 'jsonwebtoken';
import config from '../config';

export interface IAuth extends Document {
    username: string;
    email: string;
    password: string;
    access: string;
}
export interface IAuthMethods {
    generateAuthToken(): string;
}

type AuthModel = Model<IAuth, {}, IAuthMethods>;

const authSchema = new Schema<IAuth, AuthModel, IAuthMethods>({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    access: {
        type: String,
        enum : ["admin", "user"]
    }  
});

authSchema.method('generateAuthToken', function() {
    const token = jwt.sign(
        {
            _id: this._id,
            username: this.username,
            access: this.access
        },
        config.JWTPKWEBSHOP
    );
    return token;
});

export default mongoose.model<IAuth, AuthModel>('Auth', authSchema);

export function validateAuth(admin : IAuth) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(72).required(),
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        access: Joi.string()
    });
    return schema.validate(admin);
}

