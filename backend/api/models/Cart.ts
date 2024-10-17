import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
