import Mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  return Mongoose.connect(config.db);
};
