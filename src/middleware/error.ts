import winston from 'winston';

import {NextFunction, Request, Response } from 'express';

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    winston.error(err.message, err);
    res.status(500).send(`Der er opstået en fejl: ${err.message}` );
}

export default handleError;