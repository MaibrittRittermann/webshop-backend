if (process.env.NODE_ENV !== "production") require("dotenv").config({path: `.env.${process.env.NODE_ENV}`});
import logging from "./startup/logging";
import express from 'express';
import startRoutes from './startup/routes';
import connectDB from './startup/db';

logging();
const app = express();
connectDB();
startRoutes(app);

const port = process.env.PORT || 3000;
export const server = app.listen(port, () => { console.log(`listening on ${port}`) });

