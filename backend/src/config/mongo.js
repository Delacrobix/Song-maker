import mongoose from 'mongoose';

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

export const dbConnection = async () => {
  await mongoose.connect(MONGODB_CONNECTION);

  console.log('Mongodb connection established.');
};
