import mongoose from 'mongoose';
import { userSchema } from '../db/schema/user';

const User = mongoose.model('User', userSchema);

export class UserRepository {
  createUser = async (params: object) => {
    await User.create(params);
  };

  getUserByEmail = async (email: string) => {
    return await User.findOne({ email });
  };

  getUserById = async (userId: string) => {
    return await User.findById(userId);
  };
}
