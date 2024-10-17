import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
