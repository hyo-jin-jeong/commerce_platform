import mongoose from 'mongoose';
import { userSchema } from '../db/schema/user';

const User = mongoose.model('User', userSchema);

const createUser = async (params: object) => {
  User.create(params);
};

const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export default {
  createUser,
  getUserByEmail,
};
