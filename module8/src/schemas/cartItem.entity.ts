import {ProductEntity, ProductSchema} from "./product.entity";
import mongoose, {Schema} from "mongoose";

export interface CartItemEntity {
    product: ProductEntity;
    count: number;
}

export const CartItemSchema: Schema = new Schema<CartItemEntity>({
    product: ProductSchema,
    count: Number
})

export default mongoose.model<CartItemEntity>('CartItem', CartItemSchema);
