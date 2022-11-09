import mongoose from 'mongoose';
import { userSchema } from '../db/schema/user';

const User = mongoose.model('User', userSchema);

const createUser = async (params: object) => {
  await User.create(params);
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

export { createUser, getUserByEmail, getUserById };
