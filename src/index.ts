import express from 'express';
import { startRoutes } from './startup/routes';
import connectDB from './startup/db';

const app = express();
connectDB();
startRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening on ${port}`)});