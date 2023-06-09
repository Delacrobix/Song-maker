import mongoose from 'mongoose';

const MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || 'mongodb://localhost/song-maker';

console.log('MONGO: ', MONGODB_CONNECTION);

export const dbConnection = async () => {
  mongoose.connect(MONGODB_CONNECTION);
  console.log('Mongodb connection established on: ' + MONGODB_CONNECTION);
};
