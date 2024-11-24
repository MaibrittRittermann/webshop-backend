import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("Connect to DB");
    mongoose
        .connect('mongodb://127.0.0.1:27017/webshopts')
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch(err => {
            console.error('Failed to connect to MongoDB', err);
   });
}

export default connectDB;