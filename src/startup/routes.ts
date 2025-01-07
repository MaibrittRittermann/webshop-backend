import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from '../routes/productRoutes';
import loginRoute from '../routes/loginRoute';
import orderRoute from '../routes/orderRoute';
import authRoute from '../routes/authRoute';
import handleError from './../middleware/error';
import reviewRoute from '../routes/reviewRoute';

export default function startRoutes (app: express.Express) {   
    app.use(bodyParser.json());
 
    const corsOptions = {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200 
    }

    app.use(cors(corsOptions));

    app.use('/api/product', productRoutes);
    app.use('/api/product/review', reviewRoute)
    app.use('/api/login', loginRoute);
    app.use('/api/order', orderRoute);
    app.use('/api/auth', authRoute);

    app.use(handleError);
}