import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from '../routes/productRoutes';
import handleError from './../middleware/error';

export function startRoutes (app: express.Express) {   
    app.use(bodyParser.json());
 
    app.use('/api/product', productRoutes);

    app.use(handleError);
}