import Auth from "../../../models/auth";
import config from "../../../config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

describe('auth.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id : new mongoose.Types.ObjectId().toHexString(),
            username: 'a', 
            access: 'admin'
        }

        const user = new Auth(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.JWTPKWEBSHOP);
        expect(decoded).toMatchObject(payload);

    });
});
