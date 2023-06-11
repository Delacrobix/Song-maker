import mongoose from 'mongoose';

const MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || 'mongodb://localhost/song-maker';

export const dbConnection = async () => {
  await mongoose.connect(MONGODB_CONNECTION);
  console.log('Mongodb connection established on: ' + MONGODB_CONNECTION);
};
