import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// Middleware til at validere ObjectId
const validateObjectId = (req: Request, res: Response, next: NextFunction) : void => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({ error: 'Invalid ID format' });
    } else {
        next();
    }

};

export default validateObjectId;



// import mongoose from "mongoose";
// import { Request, Response, NextFunction } from "express";

// export function validateObjectID (req : Request, res : Response, next : NextFunction) {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id))
//     return res.status(404).send("Ugyldig id");
//   next();
// };
