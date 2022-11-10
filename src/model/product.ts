import mongoose from 'mongoose';
import { productSchema } from '../db/schema/product';

const Product = mongoose.model('Product', productSchema);
