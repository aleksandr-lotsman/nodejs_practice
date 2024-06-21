import mongoose, { Schema, Document } from 'mongoose';
import {CartItemEntity, CartItemSchema} from "./cartItem.entity";

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

const CartSchema: Schema = new Schema<CartEntity>({
  id: Schema.Types.UUID,
  userId: Schema.Types.UUID,
  isDeleted: Boolean,
  items: [CartItemSchema]
})

export default mongoose.model<CartEntity>('Cart', CartSchema);