import { marketSchema } from '../db/schema/market';
import mongoose from 'mongoose';

const Market = mongoose.model('Market', marketSchema);
