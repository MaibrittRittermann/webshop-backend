import Debug from 'debug';
const debug = Debug("webshop");
import {NextFunction, Request, Response } from 'express';

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    debug(err);
    res.status(500).send("Der er opstået en fejl");
}

export default handleError;