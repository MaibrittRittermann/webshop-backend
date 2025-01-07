import mongoose from 'mongoose';
import config from '../config';
import winston from "winston";

const connectDB = async () => {
    mongoose
        .connect(config.MONGO_URI)
        .then(() => {
            winston.info('Connected to MongoDB');
        }).catch(err => {
            winston.error('Failed to connect to MongoDB', err);
   });
}

export default connectDB;