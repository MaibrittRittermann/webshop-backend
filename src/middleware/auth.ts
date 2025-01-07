import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import config from '../config';
import winston from 'winston';

export interface CustomRequest extends Request {
    token: string|JwtPayload;
}

export default function auth (req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-auth-token");
    if(!token) 
        res.status(401).send("Login to proceed");
    else {   
        try {
            const SECRET_KEY: Secret = config.JWTPKWEBSHOP;
            const decoded = jwt.verify(token, SECRET_KEY);
            (req as CustomRequest).token = decoded;
            next();
        } catch (err) {
            winston.error("Authentication error", err);
            res.status(400).send("Invalid token");
        }
    }
}