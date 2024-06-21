import mongoose, {Schema} from "mongoose";
import {CartItemEntity, CartItemSchema} from "./cartItem.entity";

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string, // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[] // products from CartEntity
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

export const OrderSchema: Schema = new Schema<OrderEntity>({
  id: Schema.Types.UUID, // uuid
  userId: Schema.Types.UUID,
  cartId: Schema.Types.UUID,
  items: [CartItemSchema], // products from CartEntity
  payment: {
    type: String,
    address: String,
    creditCard: String,
  },
  delivery: {
    type: String,
    address: String,
  },
  comments: String,
  status: String,
  total: Number
})

export default mongoose.model<OrderEntity>('Order', OrderSchema);